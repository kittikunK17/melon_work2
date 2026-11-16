/* ==========================================================================
   ตะวันฟาร์ม — ไฟล์ข้อมูลของเว็บ (แก้ไฟล์นี้ไฟล์เดียวพอ)
   --------------------------------------------------------------------------
   วิธีแก้:
   - แก้เฉพาะข้อความที่อยู่ใน '...' เท่านั้น อย่าลบเครื่องหมาย ' , { } [ ]
   - ช่องไหนยังไม่มีข้อมูล ให้ปล่อยว่างไว้แบบนี้ ''  เว็บจะซ่อนช่องนั้นให้เอง
   - รูป: เอาไฟล์รูปไปใส่ในโฟลเดอร์ images/ ตามชื่อที่เขียนไว้ด้านล่าง
     ถ้ายังไม่มีรูป เว็บจะแสดงภาพวาดเมลอนแทนให้อัตโนมัติ
   ========================================================================== */

window.SITE = {

  /* ---------- ข้อมูลติดต่อ ---------- */
  phone: '089-456-7123',          // เบอร์ที่แสดงบนเว็บ
  phoneDial: '0894567123',        // เบอร์สำหรับกดโทร (ตัวเลขล้วน)
  mapLink: 'https://maps.app.goo.gl/BSAGVaqG4gFMrHDj9',
  mapEmbed: true,                 // true = แสดงแผนที่ Google Maps ในหน้าเว็บ
  address: {
    th: 'เลขที่ 1164/7 ถนนประจักษ์ศิลปาคม ตำบลในเมือง อำเภอเมืองหนองคาย จังหวัดหนองคาย 43000',
    en: '1164/7 Prajak Sillapakhom Road, Nai Mueang, Mueang Nong Khai, Nong Khai 43000, Thailand'
  },

  /* ---------- รูปบรรยากาศสวน (ส่วน "มาเที่ยวสวน") ---------- */
  farmPhoto: 'images/farm/farm-1.jpg',

  /* ---------- รูปและวิดีโอ (ส่วน "รูปและวิดีโอจากสวน") ----------
     ใส่ไฟล์รูปใน images/gallery/  และไฟล์วิดีโอใน videos/
     แล้วเพิ่ม/ลบบรรทัดด้านล่างให้ตรงกับไฟล์ที่มี (เรียงตามลำดับที่อยากให้แสดง)
       รูป:      { type: 'photo', src: 'images/gallery/photo-1.jpg', th: 'คำบรรยาย', en: 'Caption' },
       วิดีโอ:    { type: 'video', src: 'videos/video-1.mp4', poster: 'images/gallery/video-1.jpg', th: '', en: '' },
       YouTube:  { type: 'youtube', id: 'dQw4w9WgXcQ', th: '', en: '' },   ← id คือรหัสท้ายลิงก์ youtu.be/xxxx
     - ไฟล์ไหนยังไม่มี เว็บจะซ่อนช่องนั้นให้เอง  ถ้าไม่มีเลยทั้งหมด ส่วนนี้จะถูกซ่อน
     - poster = รูปหน้าปกวิดีโอ (ไม่ใส่ก็ได้ ปล่อย '')
     - วิดีโอยาว/ใหญ่เกิน 50 MB ให้อัปขึ้น YouTube แล้วใช้แบบ youtube แทน
  */
  gallery: [
    { type: 'video', src: 'videos/for_commer.mp4', poster: '', th: 'เดินชมโรงเรือนเมลอนของเรา', en: 'A walk through our melon greenhouse' },
    { type: 'photo', src: 'images/gallery/photo-1.jpg', th: 'เมลอนเหลืองบนต้น ในโรงเรือนของเรา', en: 'Yellow melons ripening on the vine' },
    { type: 'photo', src: 'images/gallery/photo-2.jpg', th: 'ลูกนี้ใกล้เก็บแล้ว', en: 'Almost ready to pick' },
    { type: 'photo', src: 'images/gallery/photo-3.jpg', th: 'ป้ายหน้าบ้านตะวันรีสอร์ท และบ้านสวนตะวันฟาร์ม', en: 'Our sign at Baan Tawan Resort & Tawan Farm' }
  ],

  /* ---------- เมลอนแต่ละพันธุ์ ----------
     เพิ่ม/ลดพันธุ์ได้: ก๊อปปี้ตั้งแต่ { ถึง }, ทั้งก้อน แล้ววางต่อท้าย
     ตัวอย่างการกรอก (ภาษาไทย):
       name:   'กรีนเนท'
       short:  'เนื้อเขียว หวานกรอบ กลิ่นหอม'
       long:   'พันธุ์ยอดนิยมของสวน เนื้อแน่น ...'
       flesh:  'เขียวอ่อน'
       taste:  'หวานกรอบ'
       sweet:  '14–16 บริกซ์'
       weight: '1.5–2 กก. ต่อลูก'
       season: 'ม.ค. – เม.ย.'
       tip:    'แช่เย็นสัก 2 ชั่วโมงก่อนผ่า จะหวานฉ่ำขึ้น'
  */
  melons: [
    {
      photo: 'images/melons/melon-1.jpg',
      th: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' },
      en: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' }
    },
    {
      photo: 'images/melons/melon-2.jpg',
      th: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' },
      en: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' }
    },
    {
      photo: 'images/melons/melon-3.jpg',
      th: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' },
      en: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' }
    },
    {
      photo: 'images/melons/melon-4.jpg',
      th: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' },
      en: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' }
    },
    {
      photo: 'images/melons/melon-5.jpg',
      th: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' },
      en: { name: '', short: '', long: '', flesh: '', taste: '', sweet: '', weight: '', season: '', tip: '' }
    }
  ],

  /* ---------- ข้อความบนเว็บ (ไทย / อังกฤษ) ---------- */
  text: {
    th: {
      skip: 'ข้ามไปเนื้อหา',
      nav_varieties: 'สายพันธุ์', nav_visit: 'ชมสวน', nav_gallery: 'รูปและวิดีโอ', nav_contact: 'ติดต่อเรา', menu: 'เมนู',
      hero_eyebrow: 'เมลอนหนองคาย จากบ้านตะวันรีสอร์ท',
      hero_title1: 'หวาน หอม', hero_title2: 'สดจากสวนหนองคาย',
      hero_lead: 'เมลอนที่เราปลูกเองทุกลูกที่ตะวันฟาร์ม อยากชิม อยากสั่ง หรืออยากมาเที่ยวสวน โทรคุยกับเราได้เลย',
      cta_call: 'โทรสอบถาม', cta_varieties: 'ดูสายพันธุ์', cta_visit: 'ชมสวน', cta_order: 'สั่งเมลอน',
      f1_t: 'ปลูกเองทุกลูก', f1_d: 'ดูแลเองที่ฟาร์มของบ้านตะวันรีสอร์ท',
      f2_t: 'สดจากสวน', f2_d: 'เก็บจากต้นที่หนองคาย ไม่ผ่านคนกลาง',
      f3_t: 'โทรคุยกับเจ้าของสวน', f3_d: 'ถามได้ทุกเรื่อง สั่งได้ ชวนมาเที่ยวได้',
      var_title: 'สายพันธุ์ที่ปลูกในสวน',
      var_hint: 'เลื่อนซ้ายขวาเพื่อดูทุกพันธุ์',
      variety: 'พันธุ์ที่', of: 'จาก', coming: 'รายละเอียดเร็วๆ นี้ โทรถามเราได้เลย',
      more: 'ดูรายละเอียด', prev: 'พันธุ์ก่อนหน้า', next: 'พันธุ์ถัดไป', goto: 'ไปพันธุ์ที่',
      flesh: 'สีเนื้อ', taste: 'รสชาติ', sweet: 'ความหวาน', weight: 'น้ำหนัก', season: 'ช่วงเก็บ',
      tip: 'เคล็ดลับจากสวน', order: 'โทรสั่งพันธุ์นี้', close: 'ปิด',
      visit_title: 'ชมสวนเมลอนที่บ้านตะวัน',
      visit_text: 'เดินดูต้นเมลอนของจริง ชิมลูกสดจากสวน แล้วพักผ่อนที่บ้านตะวันรีสอร์ท โทรนัดล่วงหน้าก่อนมาได้เลย',
      visit_cta: 'โทรนัดชมสวน',
      contact_title: 'ติดต่อตะวันฟาร์ม',
      contact_text: 'สอบถาม สั่งเมลอน หรือนัดชมสวน โทรหาเราได้เลย',
      copy: 'คัดลอกเบอร์', copied: 'คัดลอกเบอร์แล้ว', copy_fail: 'เลือกเบอร์ไว้แล้ว กดคัดลอกเองได้เลย',
      map_open: 'เปิดใน Google Maps', map_title: 'แผนที่ตะวันฟาร์ม',
      resort: 'บ้านตะวันรีสอร์ท',
      callbar: 'โทรหาเรา',
      footer: 'เมลอนหนองคาย ปลูกเองทุกลูก',
      farm_alt: 'บรรยากาศในสวนเมลอนตะวันฟาร์ม หนองคาย',
      melon_alt: 'เมลอนพันธุ์',
      // ข้อความวิ่งใต้ภาพหลัก (เพิ่ม/ลด/แก้ได้)
      marquee: ['เมลอนหนองคาย', 'ปลูกเองทุกลูก', 'สดจากสวนทุกวัน', 'มาเที่ยวชมสวนได้', 'โทรสั่ง 089-456-7123'],
      cut_title: 'จากสวนของเรา ถึงมือคุณ',
      steps_title: 'มาเที่ยวสวนง่ายๆ 3 ขั้นตอน',
      step1_t: 'โทรนัดล่วงหน้า', step1_d: 'บอกวันและจำนวนคน เราจะเตรียมเมลอนให้ชิม',
      step2_t: 'มาที่บ้านตะวันรีสอร์ท', step2_d: 'อยู่ในตัวเมืองหนองคาย ดูทางได้จากแผนที่ด้านล่าง',
      step3_t: 'เดินชมสวน ชิมสดจากต้น', step3_d: 'ถูกใจพันธุ์ไหน ซื้อกลับบ้านได้เลย',
      details_hint: 'แตะเพื่อดูพันธุ์นี้',
      gallery_title: 'รูปและวิดีโอจากสวน', gallery_hint: 'แตะรูปเพื่อดูภาพใหญ่', gallery_alt: 'ภาพจากสวนตะวันฟาร์ม', gallery_video: 'วิดีโอจากสวนตะวันฟาร์ม'
    },
    en: {
      skip: 'Skip to content',
      nav_varieties: 'Varieties', nav_visit: 'Visit', nav_gallery: 'Gallery', nav_contact: 'Contact', menu: 'Menu',
      hero_eyebrow: 'Nong Khai melons from Baan Tawan Resort',
      hero_title1: 'Sweet, fragrant,', hero_title2: 'fresh from our farm',
      hero_lead: 'We grow every melon ourselves at Tawan Farm in Nong Khai. Want to taste, order, or visit the farm? Give us a call.',
      cta_call: 'Call us', cta_varieties: 'See our melons', cta_visit: 'Visit the farm', cta_order: 'Order melons',
      f1_t: 'Grown by us', f1_d: 'Every melon is cared for on our own farm',
      f2_t: 'Fresh from the farm', f2_d: 'Picked in Nong Khai, sold directly by us',
      f3_t: 'Talk to the farmer', f3_d: 'Ask anything, place an order, plan a visit',
      var_title: 'Melons we grow',
      var_hint: 'Swipe to see every variety',
      variety: 'Variety', of: 'of', coming: 'Details coming soon. Call us to ask.',
      more: 'See details', prev: 'Previous variety', next: 'Next variety', goto: 'Go to variety',
      flesh: 'Flesh', taste: 'Taste', sweet: 'Sweetness', weight: 'Weight', season: 'Harvest',
      tip: 'Tip from the farm', order: 'Call to order this melon', close: 'Close',
      visit_title: 'Visit our melon farm',
      visit_text: 'Walk through the melon plants, taste fruit straight from the vine, and relax at Baan Tawan Resort. Call ahead to book your visit.',
      visit_cta: 'Call to book a visit',
      contact_title: 'Contact Tawan Farm',
      contact_text: 'Questions, orders, or farm visits — call us.',
      copy: 'Copy number', copied: 'Number copied', copy_fail: 'Number selected — copy it manually',
      map_open: 'Open in Google Maps', map_title: 'Map to Tawan Farm',
      resort: 'Baan Tawan Resort',
      callbar: 'Call us',
      footer: 'Nong Khai melons, grown by us',
      farm_alt: 'Tawan Farm melon garden in Nong Khai',
      melon_alt: 'Melon variety',
      marquee: ['Nong Khai melons', 'Grown by us', 'Fresh from the farm', 'Farm visits welcome', 'Call 089-456-7123'],
      cut_title: 'From our farm to your hands',
      steps_title: 'Visit the farm in 3 easy steps',
      step1_t: 'Call ahead', step1_d: 'Tell us the day and group size, and we will prepare melons to taste',
      step2_t: 'Come to Baan Tawan Resort', step2_d: 'In Nong Khai town. Directions are on the map below',
      step3_t: 'Walk the farm and taste', step3_d: 'Found a favourite? Take some home',
      details_hint: 'Tap to see this melon',
      gallery_title: 'Photos & videos from the farm', gallery_hint: 'Tap a photo to enlarge', gallery_alt: 'Photo from Tawan Farm', gallery_video: 'Video from Tawan Farm'
    }
  }
};
