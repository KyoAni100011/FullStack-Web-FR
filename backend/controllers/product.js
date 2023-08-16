const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400)
        throw new Error('No data')
    }
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    const newProduct = await Product.create(req.body)
    return res.status(201).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Cant create new product"
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : "Cant find product"
    })
})

//get all products
//filter, sort, pagination
const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query } //copy req.query but refer to a different memory cell than req.body refers to
    //Tách các trường đặc biệt ra khỏi queries
    const excludeFields = ['sort', 'limit', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])

    //Format lại các operators cho đúng cú pháp của mongoose
    let queryStr = JSON.stringify(queries) //convert object to string
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) //replace all gte, gt, lte, lt with $gte, $gt, $lte, $lt
    const formatedQueries = JSON.parse(queryStr) //convert string to object

    //Filtering
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' } //find all products that have title contains queries.title (Just match 1 word is valid), i: case insensitive
    let queryCommand = Product.find(formatedQueries) //find all products that match the query

    //Sorting
    //abc,def => abc def
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ') //replace all commas with spaces
        queryCommand = queryCommand.sort(sortBy)
    }

    //Field limiting to exclude some fields
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields) //select only fields that are specified in req.query.fields, (+fields) => get(fields), (-fields) => exclude(fields)
    }

    //pagination 
    // +2 => 2
    // +dsaasd => NaN
    const page = +req.query.page || 1 //default page = 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS //default limit = 2
    const skip = (page - 1) * limit //skip the first (page - 1) * limit products
    queryCommand = queryCommand.skip(skip).limit(limit)

    //Execute query
    queryCommand.exec()
        .then(async response => {
            const counts = await Product.find(formatedQueries).countDocuments(); //count all products that match the query   
            return res.status(200).json({
                success: response ? true : false,
                counts,
                products: response ? response : "Can't find products"
            });
        })
        .catch(err => {
            throw new Error(err.message);
        });
})

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProduct: updatedProduct ? updatedProduct : "Cant update product"
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProduct: deletedProduct ? deletedProduct : "Cant delete product"
    })
})

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid } = req.body
    if (!star || !pid) throw new Error('Missing input')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id) //find rating of current user
    console.log({ alreadyRating })
    if (alreadyRating) {
        //update star & comment
        await Product.updateOne({
            ratings: { $elemMatch: alreadyRating } //find rating of current user
        }, {
            $set: { "ratings.$.star": star, "ratings.$.comment": comment } //update star & comment of current user
        }, { new: true })
    } else {
        //add star & comment
        const response = await Product.findByIdAndUpdate(pid, {
            $push: { ratings: { star, comment, postedBy: _id } } //add star & comment of current user
        }, { new: true })
        console.log(response)
    }

    //Sum rating
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0) //sum all star
    updatedProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10 //calculate average star

    await updatedProduct.save()

    return res.status(200).json({
        status: true,
        updatedProduct
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings
}