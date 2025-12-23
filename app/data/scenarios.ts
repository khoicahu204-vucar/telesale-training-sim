
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
  }
];
