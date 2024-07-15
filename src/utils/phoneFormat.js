function formatPhoneNumber(phone) {
 // Xóa tất cả ký tự không phải là số
 let cleaned = ('' + phone).replace(/\D/g, '');
 // Tách 3 số đầu tiên và phần còn lại
 let part1 = cleaned.slice(0, 3);
 let part2 = cleaned.slice(3);
 return {cleaned, part1, part2 };
}

module.exports = formatPhoneNumber