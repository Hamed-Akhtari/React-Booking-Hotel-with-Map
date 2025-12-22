<div align="center">
  
# 🏨 اپلیکیشن رزرو هتل با نقشه 🗺️
**یک اپلیکیشن کامل برای جستجو، مشاهده و رزرو هتل‌ها با نقشه تعاملی**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![ReactRouter](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![JSONServer](https://img.shields.io/badge/JSON_Server-000000?style=for-the-badge&logo=json&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

![Image](screenshots/BookingHotel-responsive-mockup.jpg)

🖼️ پیش‌نمایش پروژه:

<div align="center">
  
  | 🖥️  [نمایش زنده (دسکتاپ)](screenshots/desktop-demo.gif) | 📱 [نمایش زنده (موبایل)](screenshots/mobile-demo.gif) |
| ---------------- | ---------------- | 

</div>

## ✨ ویژگی‌های کلیدی

<div dir="rtl" align="right">
  
✅ **جستجوی پیشرفته هتل** - جستجو بر اساس مقصد، تاریخ و تعداد مسافران

✅ **نقشه تعاملی** - نمایش هتل‌ها و بوکمارک‌ها روی نقشه Leaflet

✅ **سیستم بوکمارک** - ذخیره‌سازی موقعیت‌های دلخواه با پرچم کشور

✅ **احراز هویت** -	سیستم لاگین/لاگ‌اوت با Protected Routes

✅ **نماهای مختلف** - لیست هتل‌ها، جزئیات کامل و نمایش نقشه‌ای

✅ **مدیریت State** -	استفاده از Context API برای Auth و بوکمارک‌ها

<span dir="rtl">REST API کامل با داده‌های واقعی هتل‌ها</span>&nbsp;- **JSON Server** ✅

</div>



## 🏗️ ساختار پروژه
```
React-Booking-Hotel-with-Map/
├── 📁 public/                      # فایل‌های استاتیک
├── 📁 screenshots/                 # تصاویر نمونه از برنامه
├── 📁 server/                      # JSON Server
│   └── db.json                          # پایگاه داده هتل‌ها و بوکمارک‌ها
├── 📁 src/
│   ├── 📁 features/                # های اصلیfeatures    
│   │   ├── 📁 auth/                    # سیستم احراز هویت
│   │   ├── 📁 bookmarks/               # مدیریت بوکمارک‌ها
│   │   └── 📁 hotels/                  # مدیریت هتل‌ها
│   ├── 📁 shared/                  # کامپوننت‌ها و هوک‌های اشتراکی
│   │   ├── 📁 components/              # کامپوننت‌های عمومی
│   │   ├── 📁 hooks/                   # هوک‌های سفارشی
│   │   └── 📁 layout/                  # لایه‌بندی‌های اصلی
│   ├── App.jsx                     # کامپوننت اصلی برنامه
│   └── main.jsx                    # نقطه ورود برنامه
├── package.json                # وابستگی‌های پروژه
├── vite.config.js              # Vite پیکربندی 
└── README.md                   # مستندات
```

## 🛠️ تکنولوژی‌های استفاده شده

<div dir="rtl" align="center">
  
  | تکنولوژی         | کاربرد                                |
| ---------------- | ------------------------------------- |
| **React 18**        | کتابخانه اصلی رابط کاربری      |
| **React Router DOM 6**         | مدیریت روتینگ و navigation |
| **React Leaflet**   | نقشه‌های تعاملی               |
| **JSON Server** | REST API سرور برای توسعه                        |
| **Axios** | ارسال درخواست‌های HTTP                       |
| **React Country Flag** | نمایش پرچم کشورها                       |
| **React Date Range** | انتخاب‌گر تاریخ پیشرفته                       |
| **Date-fns** | مدیریت تاریخ‌ها                       |
| **React Hot Toast** | نمایش نوتیفیکیشن‌ها                       |
| **React Icons** | آیکون‌های زیبا                       |

</div>

## 🎯 قابلیت‌های کلیدی برنامه

**۱. سیستم جستجوی پیشرفته**

ترکیب تاریخ، مقصد و تعداد مسافران
```javascript
const handleSearch = () => {
  const encodedParams = createSearchParams({
    date: JSON.stringify(date),
    destination,
    options: JSON.stringify(options),
  });
  navigate({ pathname: "/hotels", search: encodedParams.toString() });
};
```

**۲. نقشه تعاملی با Leaflet**

مدیریت مارکرها و انیمیشن‌ها


```javascript
<MapContainer center={mapCenter} zoom={zoom} scrollWheelZoom={true}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <MapMarkers markerLocations={markerLocations} />
  <MapHelpers GeoLocationPosition={GeoLocationPosition} />
</MapContainer>
```

**۳. سیستم بوکمارک‌ها**

ذخیره‌سازی موقعیت‌ها با Geocoding API
```javascript
const handleSubmit = async (e) => {
  const newBookmark = {
    cityName,
    country,
    countryCode,
    latitude: lat,
    longitude: lng,
    host_location: cityName + ", " + country,
  };
  await createBookmark(newBookmark);
};
```
**۴. احراز هویت و Protected Routes**

محافظت از روت‌ها
```javascript
<ProtectedRoute>
  <BookmarkLayout />
</ProtectedRoute>
```

<div align="right" dir="rtl">
  
## 🎨 کامپوننت‌های اصلی
  
**🏠 کامپوننت Header**

* نوار جستجو با فیلترهای تاریخ و تعداد مسافران
* نویگیشن بین صفحات اصلی
* سیستم احراز هویت (ورود/خروج)

**🗺️ کامپوننت Map**

* نقشه تعاملی با TileLayer از OpenStreetMap
* مارکرهای هوشمند با آیکون‌های رنگی
* قابلیت بزرگنمایی و جابجایی
* نمایش موقعیت کاربر

**📌 کامپوننت MapMarkers**

* نمایش هتل‌ها و بوکمارک‌ها روی نقشه
* پاپ‌آپ اطلاعاتی با hover effect
* آیکون‌های مختلف برای انواع موقعیت‌ها

**⭐ کامپوننت Bookmark Management**

* افزودن بوکمارک جدید با کلیک روی نقشه
* نمایش لیست بوکمارک‌های ذخیره‌شده
* حذف بوکمارک‌ها با تأیید
* نمایش پرچم کشور مربوطه

**🏨 کامپوننت Hotels**

* نمایش لیست هتل‌ها با کارت‌های زیبا
* فیلتر بر اساس مقصد و ظرفیت
* لینک به صفحه جزئیات هتل

**📄 کامپوننت SingleHotel**

* نمایش کامل اطلاعات هتل
* گالری تصاویر
* اطلاعات امکانات و قیمت‌گذاری
* نظرات کاربران و امتیازات

**🔐 کامپوننت Login**

* فرم ورود با اعتبارسنجی
* نمایش خطاهای احراز هویت
* اعتبارسنجی تستی (user@gmail.com / 1234)

**🔄 کامپوننت SidebarMapLayout**

* لایه‌بندی دوستونی (لیست + نقشه)
* نمایش همزمان اطلاعات و نقشه
* ریسپانسیو برای دستگاه‌های مختلف

## 🔧 هوک‌ها و تکنیک‌های پیشرفته

**🔄 هوک‌های سفارشی**

* <span dir="rtl">useGeoLocation</span> - دریافت موقعیت جغرافیایی کاربر
* <span dir="rtl">useUrlLocation</span> - مدیریت پارامترهای URL برای مختصات
* <span dir="rtl">useFetch</span> - هوک سفارشی برای fetch داده‌ها از API
* <span dir="rtl">useOutsideClick</span> - تشخیص کلیک خارج از کامپوننت

**🗺️ مدیریت نقشه**

* <span dir="rtl">FlyToUserLocation</span> - حرکت به موقعیت کاربر
* <span dir="rtl">FitBoundsToMarkers</span> - تنظیم زوم بر اساس مارکرها
* <span dir="rtl">DetectClick</span> - تشخیص کلیک روی نقشه برای افزودن بوکمارک
* <span dir="rtl">AnimatedCenter</span> - انیمیشن حرکت به موقعیت انتخاب شده

**🎨 آیکون‌های نقشه**

* آیکون آبی برای هتل‌های معمولی
* آیکون بنفش برای هتل/بوکمارک انتخاب شده
* آیکون قرمز برای موقعیت انتخاب شده
* آیکون سبز برای موقعیت کاربر

**Context API 🔧**

* <span dir="rtl">AuthProvider</span> - مدیریت state احراز هویت
* <span dir="rtl">BookmarksProvider</span> - مدیریت state بوکمارک‌ها
* <span dir="rtl">HotelsProvider</span> - مدیریت state هتل‌ها

</div>

## 🚀 اجرای پروژه

**۱. نصب وابستگی‌ها**
```bash
npm install
```
**۲. اجرای همزمان اپ و سرور (توصیه شده)**
```bash
npm run dev:full
```
**۳. یا اجرای جداگانه**

```bash
npm run dev      # Application: http://localhost:5173
npm run server   # JSON Server: http://localhost:5000
```


<div>
  
<div align="right">

##  API Endpoints 🔌

**JSON Server (http://localhost:5000)**

<div align="left">

```text
GET    /hotels                  # دریافت لیست هتل‌ها
GET    /hotels/{id}             # دریافت اطلاعات هتل خاص
GET    /hotels?q={query}        # جستجوی هتل‌ها
GET    /bookmarks               # دریافت بوکمارک‌ها
POST   /bookmarks               # ایجاد بوکمارک جدید
DELETE /bookmarks/{id}          # حذف بوکمارک
```
<div>

<div align="right">
  
**Geocoding API**

<div>

<div align="left">

```text
GET https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lng}     # تبدیل مختصات به آدرس
```

<div>


<div align="right">
  
## 🎯 نکات فنی برجسته

**مدیریت State پیچیده**
* ترکیب Context API با useReducer
* Sync بین URL و state برنامه
* مدیریت async operations با loading states
  
**تجربه کاربری پیشرفته**

* انیمیشن‌های نرم برای تغییرات نقشه
* Feedbackهای بصری برای کاربر
* دسترسی‌پذیری و keyboard navigation
* Responsive design کامل

**امنیت و اعتبارسنجی**

* <span dir="rtl">Protected Routes</span> برای صفحات حساس
* <span dir="rtl">Validation</span> فرم‌ها
* مدیریت خطاها با toast notifications


## 👨‍💻 توسعه‌دهنده

حامد اختری‌فر - Frontend Developer
</div>

[![GitHub Profile](https://img.shields.io/badge/👨‍💻_GitHub_Profile-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Hamed-Akhtari)

<div align="center"> ⭐ اگر این پروژه را دوست داشتید، ستاره‌ای به آن بدهید! ⭐ </div>


