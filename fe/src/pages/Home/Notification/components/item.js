export default function Item() {
  return (
    <div className="px-4 py-2 bg-red-100 flex hover:bg-gray-50 border-b-2 border-gray-100">
      <div className="image mr-3">
        <div className="image-wrapper w-[3rem] h-[3rem]">
          <img
            src="https://down-vn.img.susercontent.com/file/sg-11134004-7qvdc-ljfalfyjie7n92_tn"
            className="w-full h-full"
            alt="notification"
          />
        </div>
      </div>
      <div className="content">
        <div className="title font-semibold">
          <h1>ĐÃ GIẢM GIÁ CÒN FREESHIP</h1>
        </div>

        <div className="notification">
          <p className="text-xs">
            🛍️ Bộ sưu tập giảm 50% 💥 Deal sốc đồng giá từ 9.000Đ 🚚 Voucher
            Freeship 0Đ hot hit 💰 Giá rẻ không ngờ - Mua ngay!
          </p>
        </div>
      </div>
    </div>
  );
}
