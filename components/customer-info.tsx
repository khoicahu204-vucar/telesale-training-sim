"use client"

interface CustomerDetailsProps {
  customerId: string | null
}

const mockCustomerDetails: Record<string, any> = {
  "cust-003": {
    name: "Trịnh Văn Thành",
    phone: "0912345678",
    email: "thanh.tv@gmail.com",
    role: "Chủ xe (Cần bán)",
    vehicle: {
      model: "Hyundai Accent 2019 1.4 MT",
      odo: "132.000 km",
      color: "Trắng",
      plate: "61A-123.45"
    },
    location: "Thuận An, Bình Dương",
    desiredPrice: "400.000.000 VNĐ",
    joinDate: "20/12/2024",
    status: "Mới tạo",
    notes: "Xe gia đình, đi làm hàng ngày. Chưa đâm đụng, chỉ trầy xước nhẹ. Chính chủ mua mới.",
    history: "Chưa có lịch sử giao dịch"
  },
  "cust-004": {
    name: "Lê Văn Hùng",
    phone: "0909123456",
    email: "hung.le@gmail.com",
    role: "Chủ xe (Bán gấp)",
    vehicle: {
      model: "Mazda 3 Sport 2021 Luxury",
      odo: "45.000 km",
      color: "Đỏ",
      plate: "51H-987.65"
    },
    location: "Quận 7, TP.HCM",
    desiredPrice: "550.000.000 VNĐ",
    joinDate: "22/12/2024",
    status: "Cần xử lý gấp",
    notes: "Khách cần tiền gấp trong 3 ngày. Xe từng cọ quẹt cản trước, đã sơn lại. Bảo dưỡng hãng đầy đủ.",
    history: "Chưa có lịch sử giao dịch"
  },
  "cust-005": {
    name: "Phạm Thị Lan",
    phone: "0988776655",
    email: "lan.pham@gmail.com",
    role: "Chủ xe (Tham khảo)",
    vehicle: {
      model: "Toyota Vios 1.5G 2018",
      odo: "80.000 km",
      color: "Bạc",
      plate: "60A-567.89"
    },
    location: "Biên Hòa, Đồng Nai",
    desiredPrice: "Chưa chốt giá",
    joinDate: "23/12/2024",
    status: "Đang phân vân",
    notes: "Xe nữ chạy kỹ, còn mới. Muốn đổi sang xe gầm cao. Sợ bị ép giá.",
    history: "Chưa có lịch sử giao dịch"
  },
  "cust-006": {
    name: "Thảo",
    phone: "09xxx (Chưa rõ)",
    email: "thao.kia@gmail.com",
    role: "Chủ xe (Đổi xe điện)",
    vehicle: {
      model: "Kia K3 Premium 2.0 AT 2022",
      odo: "33.000 km",
      color: "Trắng",
      plate: "60A-xxx.xx"
    },
    location: "Biên Hòa, Đồng Nai",
    desiredPrice: "560.000.000 VNĐ",
    joinDate: "24/12/2024",
    status: "Mới tạo",
    notes: "Xe ủy quyền lần 1 chưa sang tên. Muốn đổi VF7.",
    history: "Chưa có lịch sử giao dịch"
  },
  "cust-007": {
    name: "Đặng Minh Vũ",
    phone: "09xxx (Chưa rõ)",
    email: "vu.sedona@gmail.com",
    role: "Chủ xe (Bán trả nợ)",
    vehicle: {
      model: "Kia Sedona 2.2 DAT Luxury 2020",
      odo: "130.000 km",
      color: "Đen",
      plate: "86A-xxx.xx"
    },
    location: "Bình Thuận",
    desiredPrice: "770.000.000 VNĐ",
    joinDate: "24/12/2024",
    status: "Cần bán gấp",
    notes: "Đang góp ngân hàng, dư nợ 650tr. Muốn bán trong tuần.",
    history: "Chưa có lịch sử giao dịch"
  },
  "cust-008": {
    name: "Lê Trà",
    phone: "09xxx (Chưa rõ)",
    email: "tra.vf5@gmail.com",
    role: "Bán hộ (Xe dịch vụ)",
    vehicle: {
      model: "Vinfast VF5 Plus 2024 (Mua pin)",
      odo: "70.000 km",
      color: "Vàng (Biển vàng)",
      plate: "51K-xxx.xx"
    },
    location: "Bình Chánh, TP.HCM",
    desiredPrice: "400.000.000 VNĐ",
    joinDate: "24/12/2024",
    status: "Mới tạo",
    notes: "Xe của anh ruột. Muốn đổi Limo Green.",
    history: "Chưa có lịch sử giao dịch"
  },
  "cust-009": {
    name: "Phan Tuấn Thy",
    phone: "0934080443",
    email: "thy.chevrolet@gmail.com",
    role: "Chủ DN (Đổi 7 chỗ)",
    vehicle: {
      model: "Chevrolet Orlando 2017",
      odo: "65.743 km",
      color: "Bạc",
      plate: "51D-xxx.xx"
    },
    location: "Thủ Đức, TP.HCM",
    desiredPrice: "350.000.000 VNĐ",
    joinDate: "24/12/2024",
    status: "Tiềm năng",
    notes: "Xe công ty. Định mua CX8/Santafe. Bán trong 1-2 tuần.",
    history: "Chưa có lịch sử giao dịch"
  },
  "cust-010": {
    name: "Khánh Linh",
    phone: "09xxx (Chưa rõ)",
    email: "linh.santafe@gmail.com",
    role: "Chủ xe (Định cư)",
    vehicle: {
      model: "Hyundai SantaFe 2023 2.5 Cao cấp",
      odo: "26.000 km",
      color: "Đỏ",
      plate: "18A-xxx.xx"
    },
    location: "Nam Định",
    desiredPrice: "1.000.000.000 VNĐ",
    joinDate: "24/12/2024",
    status: "Cần xử lý gấp",
    notes: "Sắp đi nước ngoài. Yêu cầu bảo mật thông tin cao.",
    history: "Chưa có lịch sử giao dịch"
  },
}

export default function CustomerInfo({ customerId }: CustomerDetailsProps) {
  const customer = customerId ? mockCustomerDetails[customerId] : null

  if (!customer) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400">
        <p>Chọn khách hàng để xem thông tin</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 overflow-y-auto">
      {/* Role & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 font-medium uppercase">Vai trò / Nhu cầu</p>
          <p className="text-white font-semibold mt-2">{customer.role}</p>
        </div>
        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 font-medium uppercase">Trạng thái hồ sơ</p>
          <p
            className={`font-semibold mt-2 ${customer.status === "Cần xử lý gấp" ? "text-red-400" :
              customer.status === "Mới tạo" ? "text-green-400" : "text-yellow-400"
              }`}
          >
            {customer.status}
          </p>
        </div>
      </div>

      {/* Vehicle Information */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Thông tin xe</h3>
        <div className="bg-slate-700 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-xs text-slate-400">Dòng xe</p>
            <p className="text-white font-bold text-lg mt-1">{customer.vehicle.model}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400">Odo (Số km)</p>
              <p className="text-white font-medium mt-1">{customer.vehicle.odo}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Biển số (Giả định)</p>
              <p className="text-white font-medium mt-1">{customer.vehicle.plate}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400">Màu sắc</p>
            <p className="text-white font-medium mt-1">{customer.vehicle.color}</p>
          </div>
        </div>
      </div>

      {/* Price & Location */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 font-medium uppercase">Giá mong muốn</p>
          <p className="text-green-400 font-bold text-lg mt-2">{customer.desiredPrice}</p>
        </div>
        <div className="bg-slate-700 rounded-lg p-4">
          <p className="text-xs text-slate-400 font-medium uppercase">Khu vực</p>
          <p className="text-white font-medium mt-2">{customer.location}</p>
        </div>
      </div>

      {/* Customer Stats */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Thông tin liên hệ</h3>
        <div className="bg-slate-700 rounded-lg p-4 space-y-3">
          <div>
            <p className="text-xs text-slate-400">Họ và tên</p>
            <p className="text-white font-medium mt-1">{customer.name}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Số điện thoại</p>
            <p className="text-white font-medium mt-1">{customer.phone}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Email</p>
            <p className="text-white font-medium mt-1">{customer.email}</p>
          </div>
        </div>
      </div>


    </div>
  )
}
