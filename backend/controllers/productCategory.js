const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');

const createCategory = asyncHandler(async (req, res) => {
    const response = await ProductCategory.create(req.body);
    return res.json({
        success: response ? true : false,
        createdCategory: response ? response : "Can't create category"
    })
})

const getCategories = asyncHandler(async (req, res) => {
    const response = await ProductCategory.find().select('title _id');
    return res.json({
        success: response ? true : false,
        prodCategories: response ? response : "Can't get category"
    })
})

const updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true })
    return res.json({
        success: response ? true : false,
        updatedCategory: response ? response : "Can't update category"
    })
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params
    const response = await ProductCategory.findByIdAndDelete(pcid)
    return res.json({
        success: response ? true : false,
        deletedCategory: response ? response : "Can't delete category"
    })
})

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}