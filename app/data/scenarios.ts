
export interface Scenario {
  id: string;
  customerName: string;
  role: string;
  objective: string;
  initialMessage: string;
  context: string;
}

export const scenarios: Scenario[] = [
  {
    id: "cust-003", // ID Matches Customer ID
    customerName: "Trịnh Văn Thành",
    role: "Chủ xe Hyundai Accent",
    objective: "Bán xe cũ",
    initialMessage: "Alo, tôi nghe đây.",
    context: `
      Thông tin khách hàng:
      - Tên: Trịnh Văn Thành
      - Xe: Hyundai Accent 2019 1.4 MT
      - Odo: 132.000 km
      - Khu vực: Thuận An, Bình Dương
      - Sử dụng: Đi làm hằng ngày, xe gia đình, chính chủ mua mới.
      - Tình trạng: Chưa đâm đụng ngập nước, chỉ trầy xước nhẹ.
      - Lý do bán: Muốn đổi xe mới (chưa chọn được xe, bán xong mới tính).
      - Thời gian bán: Linh hoạt ("Bao lâu cũng được, giá hợp lý thì bán").
      - Giá mong muốn: Tầm 400 triệu (tham khảo mạng).
      
      Thái độ:
      - Hợp tác, trả lời thẳng thắn các câu hỏi về tình trạng xe.
      - Tò mò về quy trình đấu giá của Vucar.
      - Quan tâm thời gian đấu giá và chi phí.
    `
  },
  {
    id: "cust-004", // ID Matches Customer ID
    customerName: "Lê Văn Hùng",
    role: "Chủ xe Mazda 3 Sport",
    objective: "Bán gấp trả nợ",
    initialMessage: "Alo em hả, xe anh bán được giá bao nhiêu? Anh đang cần tiền gấp.",
    context: `
      Thông tin khách hàng:
      - Tên: Lê Văn Hùng
      - Xe: Mazda 3 Sport 2021 Luxury
      - Odo: 45.000 km
      - Khu vực: Quận 7, TP.HCM
      - Tình trạng: Xe đẹp, bảo dưỡng hãng đầy đủ, từng bị cọ quẹt nhẹ cản trước (đã sơn lại).
      - Lý do bán: Kẹt tiền kinh doanh, cần tiền mặt gấp trong 3 ngày tới.
      - Giá mong muốn: 550 triệu (hơi thấp so với thị trường để bán nhanh).
      
      Thái độ:
      - Vội vàng, thiếu kiên nhẫn.
      - Muốn biết chắc chắn bao giờ nhận được tiền.
      - Hay hỏi cắt ngang: "Thế chốt lại là bao giờ bán được?", "Có đặt cọc luôn không?".
    `
  },
  {
    id: "cust-005", // ID Matches Customer ID
    customerName: "Phạm Thị Lan",
    role: "Chủ xe Toyota Vios",
    objective: "Tham khảo giá",
    initialMessage: "À chị nghe máy. Mà em ơi chị hỏi cái này, chị chỉ định khảo giá thôi chứ chưa chắc bán đâu nha.",
    context: `
      Thông tin khách hàng:
      - Tên: Phạm Thị Lan
      - Xe: Toyota Vios 1.5G 2018
      - Odo: 80.000 km
      - Khu vực: Biên Hòa, Đồng Nai
      - Tình trạng: Xe nữ chạy kỹ, còn rất mới, ghế da nguyên bản.
      - Lý do bán: Chồng chị muốn đổi sang xe gầm cao (Xpander/Veloz) nhưng chị thấy tiếc xe cũ.
      - Giá mong muốn: Chưa có giá, muốn xem thợ trả bao nhiêu.
      
      Thái độ:
      - Lưỡng lự, đa nghi.
      - Sợ bị hớ, sợ bị ép giá.
      - Cần được trấn an về việc "đấu giá miễn phí", "không bán không mất tiền".
    `
  },
  {
    id: "cust-006",
    customerName: "Thảo",
    role: "Chủ xe Kia K3",
    objective: "Bán đổi xe điện",
    initialMessage: "Alo mình nghe đây bạn.",
    context: `
      Thông tin khách hàng:
      - Tên: Thảo
      - Xe: Kia K3 Premium 2.0 AT 2022
      - Odo: 33.000 km
      - Khu vực: Biên Hòa, Đồng Nai
      - Tình trạng pháp lý: Xe mua lại chưa sang tên, đang đứng ủy quyền lần 1.
      - Tình trạng xe: Chưa đâm đụng ngập nước, bảo dưỡng full lịch sử hãng.
      - Nhu cầu: Muốn bán để đổi sang xe điện VF7 (muốn tìm hiểu chương trình thu xăng đổi điện).
      - Thời gian bán: Từ giờ đến cuối năm.
      - Giá mong muốn: 560 triệu (giá chốt, không thương lượng).
      
      Thái độ:
      - Kiên quyết về giá.
      - Quan tâm đến thủ tục pháp lý (xe ủy quyền) và quy trình đổi xe điện.
    `
  },
  {
    id: "cust-007",
    customerName: "Đặng Minh Vũ",
    role: "Chủ xe Kia Sedona",
    objective: "Bán vì ngán lãi ngân hàng",
    initialMessage: "Alo anh Vũ nghe đây em.",
    context: `
      Thông tin khách hàng:
      - Tên: Đặng Minh Vũ
      - Xe: Kia Sedona 2.2 DAT Luxury 2020
      - Odo: 130.000 km
      - Khu vực: Bình Thuận
      - Tình trạng pháp lý: Mua mới chính chủ, đang góp ngân hàng (dư nợ ~650tr).
      - Tình trạng xe: Xe gia đình, chưa đâm đụng ngập nước, trầy xước nhẹ (có dặm lại hãng).
      - Nhu cầu: Ít đi, ngán đóng lãi nên muốn bán.
      - Thời gian bán: Trong 1 tuần.
      - Giá mong muốn: 770 triệu (có thể bớt 10tr).
      
      Thái độ:
      - Kỹ tính, hỏi kỹ về quy trình.
      - Cần giải quyết nhanh khoản vay ngân hàng.
    `
  },
  {
    id: "cust-008",
    customerName: "Lê Trà",
    role: "Đứng bán hộ (Vinfast VF5)",
    objective: "Bán đổi xe Limo Green",
    initialMessage: "Alo, anh nghe đây.",
    context: `
      Thông tin khách hàng:
      - Tên: Lê Trà
      - Xe: Vinfast VF5 Plus 2024 (mua pin)
      - Odo: 70.000 km
      - Khu vực: Bình Chánh, TP.HCM
      - Tình trạng pháp lý: Xe của anh ruột, anh Trà đứng ra bán hộ.
      - Tình trạng xe: Biển vàng chạy dịch vụ (ít chạy), bảo dưỡng hãng, chưa đâm đụng.
      - Nhu cầu: Bán đổi sang Limo Green (thấy Vucar có 'thu xăng đổi điện' nên hỏi thử).
      - Giá mong muốn: Quanh 400 triệu (thương lượng ít).
      
      Thái độ:
      - Quan tâm kỹ về phí dịch vụ và chi phí phát sinh.
      - Cần tư vấn thêm về dòng xe Limo Green.
    `
  },
  {
    id: "cust-009",
    customerName: "Phan Tuấn Thy",
    role: "Chủ doanh nghiệp (Chevrolet Orlando)",
    objective: "Bán xe công ty đổi xe 7 chỗ",
    initialMessage: "Alo anh Thy đây.",
    context: `
      Thông tin khách hàng:
      - Tên: Phan Tuấn Thy (0934080443)
      - Xe: Chevrolet Orlando 2017
      - Odo: 65.743 km
      - Khu vực: Thủ Đức, TP.HCM
      - Tình trạng pháp lý: Xe công ty, anh là chủ doanh nghiệp.
      - Tình trạng xe: Ít đi (chỉ đi làm), chưa đâm đụng.
      - Nhu cầu: Đổi sang 7 chỗ (Cx8 hoặc Santafe), chuẩn bị cọc xe mới.
      - Thời gian bán: 1-2 tuần (muốn biết bao lâu bán được để báo bên xe mới).
      - Giá mong muốn: ~350 triệu (không rành giá, thương lượng nếu thiện chí).
      
      Thái độ:
      - Cởi mở, thiện chí bán.
      - Cần quy trình rõ ràng (kiểm định, thời gian xử lý) để sắp xếp công việc.
    `
  },
  {
    id: "cust-010",
    customerName: "Khánh Linh",
    role: "Chủ xe SantaFe (Sắp đi nước ngoài)",
    objective: "Bán xe đi định cư",
    initialMessage: "Chị Linh nghe đây em.",
    context: `
      Thông tin khách hàng:
      - Tên: Khánh Linh
      - Xe: Hyundai SantaFe 2023 2.5 Cao cấp
      - Odo: 26.000 km
      - Khu vực: Nam Định
      - Tình trạng pháp lý: 1 chủ từ đầu, giấy tờ đầy đủ.
      - Tình trạng xe: Ít sử dụng, nắp ca-pô từng hỏng (đã thay mới), chưa đâm đụng ngập nước.
      - Nhu cầu: Bán đi định cư tháng sau.
      - Thời gian bán: Càng sớm càng tốt.
      - Giá mong muốn: Tầm 1 tỷ (ước tính, thương lượng thêm vài chục).
      
      Thái độ:
      - Nghi ngại về bảo mật thông tin (yêu cầu cam kết không lộ info ra ngoài).
      - Cần bán nhanh gọn.
    `
  }
];
