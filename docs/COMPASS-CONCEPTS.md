# Compass "thế giới ảo" — khảo sát concept open-source (25/8/2026, phiên tối)

> Bối cảnh: masterplan chốt ẩn dụ lâu đài lên UI; thầy muốn hướng "đại hải trình tự do khám phá"
> và ưu tiên tận dụng open-source để ít tốn công. Đây là kết quả khảo sát — CHƯA dựng gì.
> Mockup tự build (A 3D three.js + B isometric SVG) vẫn ở `compass-mockups/` làm phương án tự chủ.

## Nhóm 1 — Thế giới MULTIPLAYER (SV gặp nhau thật) ⭐ khớp Khu Cộng đồng

| Dự án | Kiểu | License | Demo/tham khảo | Công sức |
|---|---|---|---|---|
| **WorkAdventure** | 2D pixel RPG kiểu Gather: avatar đi lại, lại gần nhau bật video/chat, zone mở app | AGPL v3 + Commons Clause (cấm bán lại SaaS — trường dùng OK) | **ĐH Rennes dùng làm digital campus thật: 70 map, 450 user đồng thời, escape game, AI bot, open house tuyển sinh** | Thấp nhất/wow: docker-compose 1 VM + vẽ map Tiled; có OIDC → cắm bcse-id |
| SkyOffice | Như trên nhưng codebase nhỏ (Phaser+Colyseus+React) | MIT | github kevinshen56714/SkyOffice | Trung bình: tự host + tự sửa sâu được, ít tính năng sẵn hơn WA |

## Nhóm 2 — Thế giới 3D khám phá MỘT NGƯỜI (wow cao, không gặp nhau)

| Dự án | Kiểu | License | Demo | Công sức |
|---|---|---|---|---|
| **pmndrs/racing-game** | Lái xe 3D trong thế giới low-poly — stack R3F hiện đại nhất (react-three-fiber + cannon + drei) | MIT, asset CC0 | https://racing.pmnd.rs | Trung bình: đổi map/xe thành thuyền+đảo; codebase 2022 sạch |
| folio-2019 (Bruno Simon) | Lái xe khám phá portfolio — huyền thoại awwwards | MIT | https://bruno-simon.com | Trung bình-cao: webpack 2019 cũ, học codebase |
| bythelee / BoatPhysics3D | Mô phỏng thuyền buồm three.js (vật lý nước, buoyancy) | open GitHub | github leeboardtools/bythelee, MohamedQatish/BoatPhysics3D | Cao: là simulator, không phải khung "thế giới + zone" |

## Nhóm 3 — Nguyên liệu (dùng cho MỌI phương án)

- **Tiled** (map editor 2D, miễn phí) — vẽ map cho WA/SkyOffice/Phaser
- **Kenney.nl** (CC0) — tileset + model 3D: Pirate Kit, Medieval Town, ships…
- **Quaternius / Poly Pizza** (CC0) — model 3D low-poly
- **three.js Water + Sky** (MIT, có sẵn trong examples) — đại dương + bầu trời đẹp cho hướng 3D

## Nhận định

- **"Đại hải trình" + gặp nhau + ít tốn công nhất → WorkAdventure**: vẽ map "quần đảo BCSE"
  bằng Tiled (đảo = khu masterplan, thuyền = đi bộ trên cầu tàu/phà giữa đảo), zone cập bến mở app
  thật. Case ĐH Rennes chứng minh scale đại học chạy được thật. Hạ tầng: 1 VM (~2CPU/4GB — VM115
  probe sẵn: 4GB RAM, còn thiếu docker, chỉ 1 CPU cần tăng), TLS để CF lo, compose cần patch bỏ
  redirect HTTPS. Giới hạn: video call cần thêm LiveKit/coturn (VM riêng) — text/di chuyển thì không cần.
- **Muốn 3D thật sự** → fork pmndrs/racing-game đổi xe thành thuyền — hiện đại, MIT, nhưng
  một-người-chơi và công reskin đáng kể.
- Hai hướng KHÔNG loại trừ nhau: WA làm thế giới sống hằng ngày; mockup 3D (A) có thể thành
  landing/intro cinematic của Compass.

## Tư vấn right-size (bổ sung sau trao đổi thầy 25/8 tối)

Nhận định thầy: WA rất hay nhưng quy mô BCSE không cần phức tạp vậy; video call nên có.
→ **Đề xuất: fork SkyOffice làm "BCSE World"** thay vì WorkAdventure đầy đủ:
- Quy mô thật của BCSE: ~50-60 SV/khóa, đỉnh đồng thời ước vài chục — Colyseus dư sức.
- **Video proximity + screen share ĐÃ CÓ SẴN** (PeerJS P2P) — có luôn call mà không cần
  LiveKit/coturn; nếu sau này gặp SV mạng NAT chặt thì thêm 1 container coturn là đủ.
- MIT + codebase nhỏ (Phaser3+Colyseus+React+PeerJS, ~195 commits) → sửa sâu được:
  reskin quần đảo, cắm bcse-id (JWT), nối ngân khố điểm sau này.
- **Giá trị chiến lược**: codebase đủ nhỏ để SV owner (N8) học và mở rộng như quest/đồ án
  thật — thế giới thành di sản sống liên khóa (nguyên tắc #6/P6); Guild = chính thế giới này.
- Rủi ro thật: repo ít được bảo trì (2021) → mình "own" code; nền Phaser/Colyseus vẫn sống khỏe.
- WA giữ làm phương án khi CẦN LỚN (sự kiện trăm người, AI bot, map editor in-app).

Lộ trình nếu chốt SkyOffice: (1) fork + chạy local xem demo → (2) map quần đảo v0 (5 đảo + cảng
SV08, Tiled/pixel, tileset Kenney CC0) → (3) SSO bcse-id → (4) deploy VM115 (đã probe) →
(5) sau: coturn nếu cần + ngân khố điểm + zone mở app.

## Trạng thái

- ✅ Khảo sát xong, VM115 đã probe (Guild pm2 giữ nguyên, chưa đụng)
- ⏸ CHƯA dựng — chờ thầy chốt concept
- File cài đặt WA v1.33.3 (compose + env template) đã tải về scratchpad phiên 25/8 để tham khảo
