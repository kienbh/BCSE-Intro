// Dữ liệu khu + logic chọn khu — dùng chung cho cả 3 mockup.
const ZONES = {
  hoctap: {
    icon: "📚", name: "Khu Học tập",
    tag: "Sân luyện · Giảng đường · Thư viện",
    invite: "Luyện code theo ladder từ nhập môn đến ICPC, học môn trong kỳ, tra thư viện chưng cất.",
    apps: [["Code Arena", "https://sv12.bcse-vju.com"], ["LMS", "https://sv20.bcse-vju.com"], ["Codex", "https://sv16.bcse-vju.com"]],
  },
  guong: {
    icon: "🪞", name: "Khám phá bản thân",
    tag: "Gương soi",
    invite: "Soi bảng điểm của chính bạn, rà tín chỉ tích lũy, biết mình đang đứng đâu trên hành trình.",
    apps: [["BCSE Tracker", "https://sv18.bcse-vju.com/student"]],
  },
  xuong: {
    icon: "⚒️", name: "Xưởng & Tháp nghiên cứu",
    tag: "Xưởng rèn · Tháp NC",
    invite: "Từ năm 2: mượn FPGA/Jetson/RPi từ xa, in 3D, đọc hướng nghiên cứu của giảng viên.",
    apps: [["Hardware Lab", "https://sv14.bcse-vju.com"], ["In 3D", "https://sv10.bcse-vju.com"], ["Các Lab", "https://sv03.bcse-vju.com"]],
  },
  cau: {
    icon: "🌉", name: "Khu Nghề nghiệp",
    tag: "Cầu ra thế giới",
    invite: "Mạng lưới 42 doanh nghiệp thực tập & việc làm — xem từ năm 1, đi thực tập năm 3, bảo vệ KLTN năm cuối.",
    apps: [["Career Portal", "https://sv09.bcse-vju.com"], ["Thesis Review", "https://sv13.bcse-vju.com"]],
  },
  hoiquan: {
    icon: "🏮", name: "Khu Cộng đồng",
    tag: "Hội quán · Vườn tĩnh tâm",
    invite: "Hỏi ẩn danh, senpai giúp kohai nhận điểm thưởng; mệt thì ghé vườn tĩnh tâm Kokoro.",
    apps: [["BCSE Guild", "https://sv15.bcse-vju.com"], ["Kokoro", "https://sv06.bcse-vju.com"]],
  },
};

function initMap(defaultZone) {
  const panel = document.getElementById("zone-panel");
  function render(id) {
    const z = ZONES[id];
    document.querySelectorAll(".district").forEach(d => d.classList.toggle("sel", d.dataset.zone === id));
    panel.innerHTML =
      `<div class="zp-head"><span class="zp-icon">${z.icon}</span>` +
      `<div><div class="zp-name">${z.name}</div><div class="zp-tag">${z.tag}</div></div></div>` +
      `<p class="zp-invite">${z.invite}</p>` +
      `<div class="zp-apps">` +
      z.apps.map(([n, u]) => `<a class="zp-app" href="${u}" target="_blank" rel="noopener">${n} ↗</a>`).join("") +
      `</div>`;
  }
  document.querySelectorAll(".district").forEach(d =>
    d.addEventListener("click", () => render(d.dataset.zone)));
  render(defaultZone || "hoctap");
}
