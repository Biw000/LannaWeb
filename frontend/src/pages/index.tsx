<!doctype html>
<html lang="th" class="h-full">
<head>
  
  <script>
    // Theme init (light/dark) - persists in localStorage, defaults to system preference
    (function(){
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      const useDark = saved ? (saved === "dark") : prefersDark;
      if(useDark) document.documentElement.classList.add("dark");
    })();
  </script>
<meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>LannaVeg • ระบบจำแนกผักพื้นเมืองภาคเหนือ</title>
  <!-- Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          fontFamily: { inter: ["Inter","system-ui","sans-serif"] },
          boxShadow: {
            card: "0 16px 40px rgba(15,23,42,0.12)",
            soft: "0 8px 24px rgba(15,23,42,0.08)"
          }
        }
      }
    }
  </script>
  <!-- Google Maps script is injected at the end of <body>
  -->

<!-- Diagnostics script removed (was causing SyntaxError) -->
  <style>
    :root{ color-scheme: light; }
    html.dark{ color-scheme: dark; }
    html, body { height: auto !important; }
    body { overflow-y: auto !important; overflow-x: hidden !important; padding-bottom: env(safe-area-inset-bottom); }
    header { padding-top: env(safe-area-inset-top); }

    /* Hide scrollbars on mobile horizontal nav */
    .no-scrollbar::-webkit-scrollbar{ display:none; }
    .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
    .view{ display:none; }
    .view.active{ display:block; }
    #map { background: rgba(15,23,42,.04); }
    html.dark #map { background: rgba(15,23,42,.35); }
    #map { touch-action: pan-x pan-y; pointer-events: auto; }
#map{width:100%;min-height:320px;}

    .card{
      background:rgba(255,255,255,.92);
      border:1px solid rgba(226,232,240,.85);
      border-radius:16px;
      box-shadow:0 16px 40px rgba(15,23,42,.12);
    }
    html.dark .card{
      background:rgba(15,23,42,.62);
      border-color:rgba(30,41,59,.92);
    }
    .badgeIcon{
      display:inline-flex; width:30px; height:30px;
      align-items:center; justify-content:center;
      border-radius:999px;
      background:rgba(16,185,129,.12);
      color:rgba(4,120,87,.95);
      flex: 0 0 auto;
    }
    html.dark .badgeIcon{
      background:rgba(16,185,129,.18);
      color:rgba(167,243,208,.95);
    }
    .chipbtn{
      display:inline-flex; align-items:center; gap:.5rem;
      padding:.45rem .7rem; border-radius:999px;
      border:1px solid rgba(226,232,240,.9);
      background:rgba(248,250,252,.7);
      transition:.15s ease;
      font-size:13px; color:rgba(71,85,105,.95);
      user-select:none;
      max-width: 260px;
    }
    html.dark .chipbtn{
      border-color:rgba(51,65,85,.9);
      background:rgba(15,23,42,.55);
      color:rgba(226,232,240,.9);
    }
    .btnPrimary{
      display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.75rem 1rem; border-radius:999px;
      background:#059669; color:white;
      font-weight:900; font-size:15px;
      box-shadow:0 8px 24px rgba(15,23,42,.08);
      transition:.15s ease;
      width:100%;
    }
    .btnPrimary:hover{ background:#10b981 }
    .btnPrimary:active{ transform:scale(.985) }
    .btnPrimary:disabled{ background:#94a3b8; cursor:not-allowed; box-shadow:none }
    .btnSecondary{
      display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.75rem 1rem; border-radius:999px;
      border:1px solid rgba(226,232,240,.85);
      background:rgba(248,250,252,.7);
      font-weight:900; font-size:15px;
      transition:.15s ease;
      width:100%;
    }
    html.dark .btnSecondary{ border-color:rgba(51,65,85,.9); background:rgba(15,23,42,.45) }
    .btnSecondary:active{ transform:scale(.985) }
    .btnSocial{
      width:100%;
      display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.85rem 1rem; border-radius:14px;
      border:1px solid rgba(226,232,240,.85);
      background:rgba(255,255,255,.92);
      font-weight:900; font-size:14px;
      transition:.15s ease;
    }
    html.dark .btnSocial{ border-color:rgba(51,65,85,.9); background:rgba(15,23,42,.55) }
    .btnSocial:active{ transform:scale(.985) }
    .btnGuest{
      width:100%;
      display:inline-flex; align-items:center; justify-content:center; gap:.5rem;
      padding:.85rem 1rem; border-radius:14px;
      border:1px solid rgba(16,185,129,.45);
      background:rgba(236,253,245,.75);
      color:rgba(4,120,87,.95);
      font-weight:900; font-size:14px;
      transition:.15s ease;
    }
    html.dark .btnGuest{
      border-color:rgba(16,185,129,.35);
      background:rgba(16,185,129,.18);
      color:rgba(167,243,208,.95);
    }
    .btnGuest:active{ transform:scale(.985) }
    .dropzone{
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      border-radius:16px; cursor:pointer;
      border:1px dashed rgba(16,185,129,.55);
      background:rgba(236,253,245,.35);
      padding:40px 16px;
      transition:.15s ease;
      text-align:center;
    }
    html.dark .dropzone{
      border-color:rgba(16,185,129,.35);
      background:rgba(16,185,129,.10);
    }
    .input{
      width:100%;
      border-radius:12px;
      border:1px solid rgba(226,232,240,.85);
      background:rgba(248,250,252,.75);
      padding:.8rem .9rem;
      font-size:16px;
      outline:none;
    }
    html.dark .input{
      border-color:rgba(51,65,85,.9);
      background:rgba(15,23,42,.55);
      color:rgba(226,232,240,.95);
    }
    .input:focus{
      border-color:rgba(16,185,129,.7);
      box-shadow:0 0 0 3px rgba(16,185,129,.18);
    }
    .pillOk{
      display:inline-flex; align-items:center; gap:.25rem;
      padding:.3rem .65rem;
      border-radius:999px;
      font-size:12px;
      border:1px solid rgba(16,185,129,.25);
      background:rgba(236,253,245,.7);
      color:rgba(4,120,87,.95);
      font-weight:900;
    }
    html.dark .pillOk{
      border-color:rgba(16,185,129,.25);
      background:rgba(16,185,129,.15);
      color:rgba(167,243,208,.95);
    }
    .pillMini{
      display:inline-flex; align-items:center; gap:.25rem;
      padding:.25rem .6rem;
      border-radius:999px;
      font-size:12px;
      border:1px solid rgba(226,232,240,.85);
      background:rgba(255,255,255,.7);
    }
    html.dark .pillMini{
      border-color:rgba(51,65,85,.9);
      background:rgba(15,23,42,.55);
    }
    .pillBtn{
      padding:.55rem .95rem;
      border-radius:999px;
      border:1px solid rgba(226,232,240,.85);
      background:rgba(248,250,252,.7);
      font-size:14px;
      transition:.15s ease;
      font-weight:900;
      user-select:none;
      width:100%;
      text-align:center;
    }
    html.dark .pillBtn{ border-color:rgba(51,65,85,.9); background:rgba(15,23,42,.55) }
    .pillBtn:hover{ border-color:rgba(16,185,129,.6); background:rgba(236,253,245,.6) }
    html.dark .pillBtn:hover{ background:rgba(16,185,129,.16) }
    .navActive{
      background: rgba(16,185,129,.16) !important;
      color: rgba(4,120,87,.95) !important;
    }
    html.dark .navActive{
      background: rgba(16,185,129,.18) !important;
      color: rgba(167,243,208,.95) !important;
    }
    @media (min-width: 768px){
      .btnPrimary, .btnSecondary, .pillBtn{ width:auto; }
    }
  </style>
</head>
<body class="min-h-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-inter">
  <!-- HEADER -->
  <header class="sticky top-0 z-[2000] border-b border-slate-200/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
    <div class="max-w-6xl mx-auto px-3 py-2 flex flex-col md:flex-row md:items-center items-start justify-between gap-2">
      <div class="flex items-center gap-3 select-none w-full md:w-auto">
        <!-- LOGO (long-press 5s for admin panel toggle) -->
        <div id="logoPress" class="w-10 h-10 rounded-xl overflow-visible shadow-soft">
          <img src="{{ url_for('static', filename='Lanna_veg_Logo_1.png') }}" alt="LannaVeg Logo" class="w-10 h-10 rounded-xl object-contain" />
        </div>
        <div>
          <div class="text-sm md:text-base font-black tracking-tight" data-i18n="appTitle">เว็บจำแนกผักพื้นบ้านล้านนา</div>
          <div class="hidden sm:block text-[12px] md:text-sm text-slate-500 dark:text-slate-400" data-i18n="appSubtitle">
            ผักพื้นบ้านภาคเหนือ เมนูพื้นเมือง และแผนที่ชุมชน
          </div>
        </div>
      </div>
      <nav class="hidden md:flex items-center gap-1 text-sm font-black">
        <button class="nav-link px-3 py-2 rounded-full" data-route="home" data-i18n="navHome">หน้าหลัก</button>
        <button class="nav-link px-3 py-2 rounded-full" data-route="scan" data-i18n="navScan">ทำนาย / จำแนกผัก</button>
        <button class="nav-link px-3 py-2 rounded-full" data-route="vegs" data-i18n="navVegs">Vegetable Info</button>
        <button class="nav-link px-3 py-2 rounded-full" data-route="map" data-i18n="navMap">Map / ตลาด-พิกัด</button>
        <button class="nav-link px-3 py-2 rounded-full" data-route="reviews" data-i18n="navReviews">Review</button>
      </nav>
      <div class="flex items-center gap-2 w-full md:w-auto overflow-visible md:flex-nowrap flex-wrap justify-end">
        <button id="langToggle" class="chipbtn whitespace-nowrap flex-shrink-0 whitespace-nowrap flex-shrink-0" title="Language">
          <span class="text-xs"></span>
          <span class="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full overflow-visible">
            <span class="pill-lang px-2 py-1" data-lang="th">TH</span>
            <span class="pill-lang px-2 py-1 opacity-60" data-lang="en">EN</span>
          </span>
        </button>
        <!-- Theme Toggle (Header) -->
        <button id="themeToggleHeader" class="chipbtn" title="Theme">
          <span class="text-xs"></span>
          <span id="themeIconHeader" class="text-sm">🌙</span>
        </button>
        <!-- Profile/Settings button (Guest -> Login) -->
        <button id="profileBtn" class="chipbtn whitespace-nowrap flex-shrink-0 whitespace-nowrap flex-shrink-0">
          <span class="text-xs"></span>
          <span id="userName" class="truncate">Guest</span>
          <!-- User status pill removed (client requirement) -->
        </button>
        <!-- Login/Logout always goes to login page -->
        <button id="authBtn" class="chipbtn whitespace-nowrap flex-shrink-0 hover:border-emerald-400/70 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20">
          <span></span><span id="authBtnLabel" class="whitespace-nowrap" data-i18n="loginLabel">เข้าสู่ระบบ</span>
        </button>
      </div>
    </div>
    <div class="md:hidden border-t border-slate-200/60 dark:border-slate-800">
      <nav class="flex gap-2 overflow-x-auto no-scrollbar max-w-6xl mx-auto px-2 py-2 text-xs font-black">
        <button class="nav-link px-3 py-2 rounded-full flex-none" data-route="home" data-i18n="navHome">หน้าหลัก</button>
        <button class="nav-link px-3 py-2 rounded-full flex-none" data-route="scan" data-i18n="navScan">ทำนาย / จำแนกผัก</button>
        <button class="nav-link px-3 py-2 rounded-full flex-none" data-route="vegs" data-i18n="navVegs">ผัก</button>
        <button class="nav-link px-3 py-2 rounded-full flex-none" data-route="map" data-i18n="navMap">Map / ตลาด-พิกัด</button>
        <button class="nav-link px-3 py-2 rounded-full flex-none" data-route="reviews" data-i18n="navReviews">ของฉัน</button>
      </nav>
    </div>
  </header>
  <main class="max-w-6xl mx-auto px-3 pt-4 pb-10 space-y-4">
    <!-- LOGIN -->
    <section id="view-login" class="view">
      <div class="max-w-lg mx-auto">
        <div class="card p-5 md:p-6 space-y-5">
          <div class="space-y-1">
            <h2 class="text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
              <span class="badgeIcon"></span>
              <span data-i18n="loginTitle">เข้าสู่ระบบ</span>
            </h2>
            <p class="text-sm md:text-base text-slate-600 dark:text-slate-300" data-i18n="loginSubtitle">
              เข้าสู่ระบบเพื่อปักหมุดและจัดการรีวิวของคุณ 
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <button id="btnLoginGoogle" data-oauth-href="/auth/google" class="btnSocial">
              <span class="w-6 h-6 inline-flex items-center justify-center" aria-hidden="true">
                <svg viewBox="0 0 48 48" class="w-5 h-5"><path fill="#EA4335" d="M24 9.5c3.1 0 5.9 1.1 8.1 2.9l6-6C34.4 3.3 29.5 1.5 24 1.5 14.9 1.5 7 6.7 3.2 14.3l7.1 5.5C12 13.7 17.6 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.5-.1-2.6-.4-3.9H24v7.4h12.7c-.6 3-2.4 5.6-5.2 7.3l8.1 6.2c4.7-4.3 7.0-10.6 7.0-18.0z"/><path fill="#FBBC05" d="M10.3 28.2c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.1-5.5C1.8 16.1 1 19 1 23.5s.8 7.4 2.2 10.2l7.1-5.5z"/><path fill="#34A853" d="M24 46.5c5.5 0 10.4-1.8 13.8-4.9l-8.1-6.2c-2.2 1.5-5.1 2.4-5.7 2.4-6.4 0-12-4.2-13.7-10l-7.1 5.5C7 41.3 14.9 46.5 24 46.5z"/></svg>
              </span>
              <span data-i18n="loginGoogle">Login with Google</span>
            </button>
<button id="btnGuest" class="btnGuest"><span></span><span data-i18n="loginGuest">Guest</span></button>
          </div>
          <div class="flex items-center gap-2">
            <div class="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
            <span class="text-xs text-slate-500 dark:text-slate-400" data-i18n="loginOr">หรือ</span>
            <div class="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
          </div>
          <!-- Email + Password -->
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="loginEmail">Email</label>
              <input id="loginEmail" class="input" type="email" placeholder="name@example.com" autocomplete="email">
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="loginPass" data-i18n="passwordLabel">รหัสผ่าน</label>
              <input id="loginPass" class="input" type="password" placeholder="••••••••" autocomplete="current-password">
            </div>
            <button id="btnLoginEmail" class="btnPrimary">
               <span data-i18n="loginBtn">เข้าสู่ระบบ</span>
            </button>
            <button id="btnGoRegister" class="btnSecondary">
              ️ <span data-i18n="goRegister">สมัครสมาชิกด้วย Email</span>
            </button>
            <div class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <span data-i18n="adminNote">แอดมินต้องล็อกอินด้วย Email </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- REGISTER -->
    <section id="view-register" class="view">
      <div class="max-w-lg mx-auto">
        <div class="card p-5 md:p-6 space-y-4">
          <div class="space-y-1">
            <h2 class="text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
              <span class="badgeIcon"></span>
              <span data-i18n="registerTitle">สมัครสมาชิก</span>
            </h2>
            <p class="text-sm md:text-base text-slate-600 dark:text-slate-300" data-i18n="registerSubtitle">
              สมัครเพื่อจัดการโปรไฟล์และรีวิวของคุณ
            </p>
          </div>
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="regName" data-i18n="nameLabel">ชื่อที่แสดง</label>
              <input id="regName" class="input" type="text" placeholder="ชื่อของคุณ" autocomplete="name">
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="regEmail">Email</label>
              <input id="regEmail" class="input" type="email" placeholder="name@example.com" autocomplete="email">
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="regPass" data-i18n="passwordLabel">รหัสผ่าน</label>
              <input id="regPass" class="input" type="password" placeholder="อย่างน้อย 6 ตัวอักษร" autocomplete="new-password">
            </div>
            <button id="btnRegisterEmail" class="btnPrimary">
               <span data-i18n="registerBtn">สมัครสมาชิก</span>
            </button>
            <button id="btnBackToLogin" class="btnSecondary">
              ← <span data-i18n="backLogin">กลับไปหน้าเข้าสู่ระบบ</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- HOME -->
    <section id="view-home" class="view active">
      <div class="card overflow-visible">
        <div class="grid md:grid-cols-2 gap-6 p-5 md:p-7">
          <div class="space-y-4">
            <div>
              <h2 class="text-xl md:text-2xl font-black tracking-tight flex items-center gap-2">
                <span class="badgeIcon"></span>
                <span data-i18n="homeTitle">สำรวจผักพื้นบ้านล้านนา</span>
              </h2>
              <p class="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300" data-i18n="homeSub">
                สแกนจากภาพ เรียนรู้สรรพคุณ และค้นหาแหล่งซื้อจากแผนที่ชุมชน
              </p>
            </div>
            <p class="text-sm md:text-base text-slate-600/90 dark:text-slate-300/90 leading-relaxed" data-i18n="homeHeroText">
              เว็บไซต์ให้ข้อมูลและจำแนกผัก พร้อมเมนู สรรพคุณ ชื่อท้องถิ่น และแผนที่ชุมชนแบบปักหมุดรีวิว
            </p>
            <div class="flex flex-col md:flex-row flex-wrap gap-2 pt-1">
              <button class="btnPrimary" data-go="scan"><span></span><span data-i18n="btnGoScan">สแกนภาพผัก</span></button>
              <button class="btnSecondary" data-go="map"><span>️</span><span data-i18n="btnGoMap">แผนที่ชุมชน</span></button>
              <button class="btnSecondary" data-go="vegs"><span></span><span data-i18n="btnGoVegs">ข้อมูลผัก</span></button>
            </div>
            <div class="flex flex-wrap gap-2 pt-2">
              <span class="pillOk" data-i18n="badgeAI">จำแนกภาพ</span>
              <span class="pillOk" data-i18n="badgeDB">ข้อมูลผัก</span>
              <span class="pillOk" data-i18n="badgeCommunity">แผนที่ชุมชน</span>
            </div>
          </div>
          <!-- Admin-only panel -->
          <div id="adminOnly" class="hidden rounded-2xl border border-emerald-100/80 dark:border-slate-800 bg-gradient-to-br from-emerald-100 via-emerald-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 p-4">
            <div class="text-sm md:text-base text-slate-600 dark:text-slate-300 space-y-3">
              <div class="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-950/25 p-3">
                <div class="font-black text-slate-800 dark:text-slate-100 mb-2">MODEL_API_URL</div>
                <input id="modelApiUrlInput" class="input" placeholder="http://localhost:8000/predict">
                <button id="saveApiUrlBtn" class="pillBtn mt-2 border-emerald-300/80 dark:border-emerald-700/80 bg-emerald-50/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                  Save
                </button>
                <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  API ต้องรับ multipart/form-data field = <b>file</b> และตอบ JSON {label, confidence, classKey?, alternatives?}
                </div>
              </div>
              <div class="text-xs text-slate-500 dark:text-slate-400">
                Camera/GPS จะทำงานดีบน <b>HTTPS</b> หรือ <b>localhost</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- SCAN (centered layout) -->
    <section id="view-scan" class="view">
      <div class="card p-5 md:p-6 space-y-4">
        <div class="text-center space-y-2">
          <h2 class="text-lg md:text-xl font-black tracking-tight inline-flex items-center gap-2">
            <span class="badgeIcon"></span>
            <span data-i18n="scanTitle">สแกนผักจากภาพ</span>
          </h2>
          <p class="text-sm md:text-base text-slate-600 dark:text-slate-300" data-i18n="scanSub">
            อัปโหลดรูป หรือ เปิดกล้องถ่ายรูป แล้วให้ AI ทำนาย
          </p>
        </div>
        <div class="max-w-3xl mx-auto w-full space-y-4">
          <div class="grid md:grid-cols-2 gap-4 items-start">
            <div class="space-y-3">
              <div id="uploadArea" class="dropzone">
                <p class="text-base font-black" data-i18n="scanUploadText">ลากรูปมาวาง หรือคลิกเพื่อเลือกไฟล์</p>
                <p class="text-xs text-slate-500 dark:text-slate-400 mt-2" data-i18n="scanUploadHint">รองรับ .jpg .jpeg .png</p>
                <input type="file" id="fileInput" accept="image/*" hidden />
              </div>
              <div class="grid sm:grid-cols-2 gap-2">
                
                
              </div>
              <div id="preview" class="space-y-2 hidden">
                <p class="text-xs text-slate-500 dark:text-slate-400" data-i18n="scanPreviewLabel">รูปที่เลือก:</p>
                <div class="rounded-2xl overflow-visible border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                  <img id="previewImage" alt="preview" class="w-full max-h-96 object-contain" />
                </div>
              </div>
              <button id="predictBtn" class="btnPrimary" disabled data-i18n="scanBtn">จำแนกชนิดผัก</button>
            </div>
            <div class="space-y-3">
              <div id="resultBox" class="hidden rounded-2xl border border-emerald-200/80 dark:border-emerald-800/80 bg-emerald-50/60 dark:bg-emerald-950/40 p-3 space-y-2">
                <div class="flex flex-wrap gap-2 items-center text-sm">
                  <span class="pillMini"><span data-i18n="scanResultLabel">ผลจำแนก:</span><span id="predLabel" class="font-black ml-1"></span></span>
                  <span class="pillMini"><span data-i18n="scanResultConf" class="hidden">ความมั่นใจ:</span><span id="predConf" class="font-black ml-1 hidden"></span></span>
                </div>
                <div id="scanVegInfo" class="text-sm md:text-base text-slate-700 dark:text-slate-200 space-y-2"></div>
                <div class="flex flex-wrap gap-3 text-sm text-emerald-800 dark:text-emerald-300 font-black">
                  <button id="scanSeeDetail" class="underline hover:no-underline" data-i18n="scanSeeDetail">ดูรายละเอียดผัก</button>
                  <span>•</span>
                  <button id="scanGoMap" class="underline hover:no-underline" data-i18n="scanSeeOnMap">ไปยังแผนที่</button>
                </div>
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- VEGS -->
    <section id="view-vegs" class="view">
      <div class="card p-5 md:p-6 space-y-4">
        <div>
          <h2 class="text-lg md:text-xl font-black tracking-tight" data-i18n="vegsTitle">ฐานข้อมูลผัก</h2>
          <p class="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2" data-i18n="vegsSub">
            ดูรายละเอียด: ชื่อท้องถิ่น สรรพคุณ เมนู ฯลฯ
          </p>
        </div>
        <div id="vegDetailBox" class="rounded-2xl border border-dashed border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 p-3 text-sm md:text-base text-slate-700 dark:text-slate-200">
          <p data-i18n="vegsDetailHint">เลือกผักจากการ์ดเพื่อดูรายละเอียด</p>
        </div>
        <div class="border-t border-slate-200/80 dark:border-slate-800 my-2"></div>
        <div class="grid md:grid-cols-[2fr,1fr] gap-4 items-start">
          <div class="space-y-3">
            <div class="grid sm:grid-cols-2 gap-3 text-xs md:text-sm">
              <div>
                <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="searchInput" data-i18n="vegsSearchLabel">ค้นหา</label>
                <input id="searchInput" class="input" placeholder="...">
              </div>
              <div>
                <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="groupSelect" data-i18n="vegsGroupLabel">กลุ่มผัก</label>
                <select id="groupSelect" class="input">
                  <option value="" data-i18n="vegsGroupAll">ทั้งหมด</option>
                  <option value="ผักช่อดอก">ผักช่อดอก</option>
                  <option value="ผักใบ">ผักใบ</option>
                  <option value="ผักผล">ผักผล</option>
                  <option value="สมุนไพร">สมุนไพร</option>
                  <option value="เครื่องเทศ">เครื่องเทศ</option>
                </select>
              </div>
            </div>
            <p id="resultSummary" class="text-sm text-slate-500 dark:text-slate-400"></p>
            <div id="vegGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm md:text-base"></div>
          </div></div>
      </div>
    </section>
    <!-- MAP -->
    <section id="view-map" class="view">
      <div class="card p-5 md:p-6 space-y-4">
        <div>
          <h2 class="text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
            <span class="badgeIcon"></span><span data-i18n="mapTitle">แผนที่ชุมชน</span>
          </h2>
          <p class="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2" data-i18n="mapSub">
            ปักหมุดและดูรีวิวสถานที่พบ/ซื้อผัก (รีวิวได้เมื่อปักหมุดแล้วเท่านั้น)
          </p>
        </div>
        <div class="relative">
          <div id="map" class="w-full h-80 md:h-[460px] rounded-xl"></div>
          <div class="absolute top-2 left-2 flex flex-col sm:flex-row gap-2 text-sm bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-700 rounded-2xl px-2 py-2 shadow-soft backdrop-blur">
            <button id="nearMeBtn" class="pillBtn" data-i18n="mapNearMe"> ค้นหาสถานที่ใกล้ฉัน</button>
            <span id="nearMeStatus" class="hidden md:inline text-slate-500 dark:text-slate-400 px-2 py-1"></span>
          </div>
        </div>
        <p id="nearMeStatusMobile" class="md:hidden text-sm text-slate-500 dark:text-slate-400"></p>
        <div class="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-3 space-y-2 text-sm md:text-base">
          <div class="grid sm:grid-cols-4 gap-2">
            <div>
              <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="reviewVeg" data-i18n="reviewVegLabel">ชนิดผัก</label>
              <select id="reviewVeg" class="input"></select>
            </div>
            <div>
              <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="reviewPlace" data-i18n="reviewPlaceLabel">ชื่อสถานที่</label>
              <input id="reviewPlace" class="input" placeholder="...">
            </div>
            <div>
              <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="reviewProvince">จังหวัด/พื้นที่</label>
              <input id="reviewProvince" class="input" placeholder="เช่น เชียงใหม่">
            </div>
            <div>
              <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="reviewRating" data-i18n="reviewRatingLabel">ให้คะแนน</label>
              <select id="reviewRating" class="input">
                <option value="5">5 / 5</option>
                <option value="4">4 / 5</option>
                <option value="3">3 / 5</option>
                <option value="2">2 / 5</option>
                <option value="1">1 / 5</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="reviewText" data-i18n="reviewTextLabel">รีวิว</label>
            <textarea id="reviewText" class="input min-h-[90px]" placeholder="..."></textarea>
          </div>
          <div class="grid md:grid-cols-3 gap-2">
            <button id="armPinBtn" class="pillBtn border-emerald-300/80 dark:border-emerald-700/80 bg-emerald-50/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-black" data-i18n="reviewArmPinBtn">
              1) กดปุ่ม แล้วคลิกบนแผนที่เพื่อ “ปักหมุด”
            </button>
            <div class="pillBtn border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-black">
              2) ระบบจะเปิดหน้าต่างรีวิวหลังยืนยันหมุด
            </div>
            <button id="pinMyLocBtn" class="pillBtn border-slate-300/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-950/25 font-black" data-i18n="pinAtMyLoc">
               ปักหมุดที่ตำแหน่งฉัน
            </button>
          </div>
          <div class="pt-1">
            <div class="font-black text-slate-600 dark:text-slate-200" data-i18n="reviewListTitle">รีวิวล่าสุด</div>
            <div id="reviewList" class="mt-1 max-h-56 overflow-y-auto space-y-2"></div>
          </div>
        </div>
      </div>
    </section>
    <!-- REVIEWS -->
    <section id="view-reviews" class="view">
      <div class="card p-5 md:p-6 space-y-3">
        <div>
          <h2 class="text-lg md:text-xl font-black tracking-tight" data-i18n="reviewsTitle">รีวิวทั้งหมด</h2>
          <p class="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2" data-i18n="reviewsSub">
            ค้นหารีวิวจากผัก/จังหวัด/คะแนน และกดไปดูหมุดบนแผนที่ได้
          </p>
        </div>
        <div class="grid md:grid-cols-4 gap-2">
          <select id="filterVeg" class="input"><option value="">ทุกชนิดผัก</option></select>
          <input id="filterProvince" class="input" placeholder="จังหวัด (เช่น เชียงใหม่)">
          <select id="filterMinRating" class="input">
            <option value="0">ทุกคะแนน</option>
            <option value="5">5/5</option>
            <option value="4">ตั้งแต่ 4/5</option>
            <option value="3">ตั้งแต่ 3/5</option>
            <option value="2">ตั้งแต่ 2/5</option>
            <option value="1">ตั้งแต่ 1/5</option>
          </select>
          <button id="filterApply" class="btnPrimary">ค้นหา</button>
        </div>
        <div id="reviewListPage" class="space-y-2 text-sm md:text-base"></div>
      </div>
    </section>
    <!-- PROFILE / SETTINGS -->
    <section id="view-profile" class="view">
      <div class="max-w-3xl mx-auto">
        <div class="card p-5 md:p-6 space-y-4">
          <div class="space-y-1">
            <h2 class="text-lg md:text-xl font-black tracking-tight flex items-center gap-2">
              <span class="badgeIcon">️</span>
              <span data-i18n="profileTitle">ตั้งค่าโปรไฟล์</span>
            </h2>
            <p class="text-sm md:text-base text-slate-600 dark:text-slate-300" data-i18n="profileSubtitle">
              ปรับชื่อที่แสดง และการตั้งค่าพื้นฐาน
            </p>
          </div>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="space-y-1">
              <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="profileName" data-i18n="nameLabel">ชื่อที่แสดง</label>
              <input id="profileName" class="input" type="text" placeholder="...">
            </div>
            <div class="space-y-1">
              <label class="block text-xs font-black text-slate-500 dark:text-slate-400" for="profileEmail">Email</label>
              <input id="profileEmail" class="input" type="text" disabled>
            </div>
          </div>
          <div class="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-3 text-sm md:text-base text-slate-600 dark:text-slate-300">
            <div class="font-black text-slate-800 dark:text-slate-100 mb-1" data-i18n="roleTitle">สิทธิ์ผู้ใช้</div>
            <div id="roleText">—</div>
          </div>
          <div class="flex flex-col md:flex-row gap-2">
            <button id="saveProfileBtn" class="btnPrimary">
               <span data-i18n="saveProfile">บันทึกโปรไฟล์</span>
            </button>
            <button id="logoutBtn2" class="btnSecondary">
               <span data-i18n="logout">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Review Modal (opens after pin confirmation) -->
  <div id="reviewModal" class="hidden fixed inset-0 z-[3000] bg-slate-900/40 backdrop-blur-sm">
    <div class="max-w-lg mx-auto mt-16 p-3">
      <div class="card p-5 md:p-6 space-y-3">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="text-lg font-black">รีวิวหลังยืนยันหมุด</div>
            <div class="text-sm text-slate-600 dark:text-slate-300">บันทึกได้เฉพาะเจ้าของหมุด</div>
          </div>
          <button id="reviewModalClose" class="pillBtn">ปิด</button>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="modalRating">ให้คะแนน</label>
            <select id="modalRating" class="input">
              <option value="5">5 / 5</option>
              <option value="4">4 / 5</option>
              <option value="3">3 / 5</option>
              <option value="2">2 / 5</option>
              <option value="1">1 / 5</option>
            </select>
          </div>
          <div>
            <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="modalPlace">ชื่อสถานที่</label>
            <input id="modalPlace" class="input" placeholder="..." disabled>
          </div>
        </div>
        <div>
          <label class="block font-black text-slate-500 dark:text-slate-400 text-xs" for="modalComment">ความคิดเห็น</label>
          <textarea id="modalComment" class="input min-h-[110px]" placeholder="เขียนรีวิวแบบสุภาพและเป็นประโยชน์"></textarea>
        </div>
        <div class="flex gap-2">
          <button id="reviewModalSave" class="btnPrimary flex-1">บันทึกรีวิว</button>
          <button id="reviewModalCancel" class="btnGhost">ยกเลิก</button>
        </div>
      </div>
    </div>
  </div>
  <script>
    const $=(id)=>document.getElementById(id);
    const on=(id,ev,fn,opt)=>{const el=$(id); if(el) el.addEventListener(ev,fn,opt||false);};
/***********************
     * CONFIG
     ***********************/
    const CONFIG = {
      DEFAULT_LANG: "th",
      MODEL_API_URL: "/predict",
      NEARBY_KM: 10,
      MAP_DEFAULT: { lat: 18.7883, lng: 98.9853, zoom: 7 },
      ADMIN_LONGPRESS_MS: 5000
    };
    /***********************
     * ADMIN
     * Admin panel is handled by the backend.
     * Long-press the logo (5s) to open /admin.
     ***********************/
    /***********************
     * I18N
     ***********************/
    const I18N = {
      th: {
        appTitle:"Lanna Veg",
        appSubtitle:"ผักพื้นบ้านภาคเหนือ เมนูพื้นเมือง และแผนที่ชุมชน",
        navHome:"หน้าหลัก", navScan:"สแกน", navVegs:"ข้อมูลผัก", navMap:"แผนที่", navReviews:"รีวิวของฉัน",
        loginLabel:"เข้าสู่ระบบ",
        loginTitle:"เข้าสู่ระบบ",
        loginSubtitle:"เข้าสู่ระบบเพื่อปักหมุดและจัดการรีวิวของคุณ",
        loginGoogle:"เข้าสู่ระบบด้วย Google",
        loginFacebook:"เข้าสู่ระบบด้วย Facebook",
        loginInstagram:"เข้าสู่ระบบด้วย Instagram",
        loginGuest:"Guest",
        loginOr:"หรือ",
        passwordLabel:"รหัสผ่าน",
        loginBtn:"เข้าสู่ระบบ",
        goRegister:"สมัครสมาชิกด้วย Email",
        adminNote:"แอดมินต้องล็อกอินด้วย Email + Password",
        registerTitle:"สมัครสมาชิก",
        registerSubtitle:"สมัครเพื่อจัดการโปรไฟล์และรีวิวของคุณ",
        nameLabel:"ชื่อที่แสดง",
        registerBtn:"สมัครสมาชิก",
        backLogin:"กลับไปหน้าเข้าสู่ระบบ",
        homeTitle:"สำรวจผักพื้นบ้านล้านนา",
        homeSub:"สแกนจากภาพ เรียนรู้สรรพคุณ และค้นหาแหล่งซื้อจากแผนที่ชุมชน",
        homeHeroText:"เว็บไซต์ให้ข้อมูลและจำแนกผัก พร้อมเมนู สรรพคุณ ชื่อท้องถิ่น และแผนที่ชุมชนแบบปักหมุดรีวิว",
        btnGoScan:"เริ่มสแกนภาพผัก", btnGoMap:"แผนที่ชุมชน", btnGoVegs:"ข้อมูลผัก",
        badgeAI:"AI จำแนกภาพ", badgeDB:"ฐานข้อมูลผัก", badgeCommunity:"แผนที่ชุมชน",
        scanTitle:"สแกนผักจากภาพ",
        scanSub:"อัปโหลดรูป หรือ เปิดกล้องถ่ายรูป แล้วให้ AI ทำนาย",
        scanUploadText:"ลากรูปมาวาง หรือคลิกเพื่อเลือกไฟล์",
        scanUploadHint:"รองรับ .jpg .jpeg .png",
        scanPreviewLabel:"รูปที่เลือก:",
        scanBtn:"จำแนกชนิดผัก",
        scanResultLabel:"ผลจำแนก:", scanResultConf:"ความมั่นใจ:",
        scanSeeDetail:"ดูรายละเอียดผัก", scanSeeOnMap:"ไปยังแผนที่",
        vegsTitle:"ข้อมูลผัก",
        vegsSub:"ดูรายละเอียด: ชื่อท้องถิ่น สรรพคุณ เมนู ฯลฯ",
        vegsDetailHint:"เลือกผักจากการ์ดเพื่อดูรายละเอียด",
        vegsSearchLabel:"ค้นหา", vegsGroupLabel:"กลุ่มผัก", vegsGroupAll:"ทั้งหมด",
        kbTipsBody:"สแกนแล้วกดดูรายละเอียด หรือไปปักหมุดรีวิวที่แผนที่ได้เลย",
        mapTitle:"แผนที่ชุมชน",
        mapSub:"ปักหมุดและดูรีวิวสถานที่พบ/ซื้อผัก (รีวิวได้เมื่อปักหมุดแล้วเท่านั้น)",
        mapNearMe:" ค้นหาสถานที่ใกล้ฉัน",
        reviewVegLabel:"ชนิดผัก",
        reviewPlaceLabel:"ชื่อสถานที่",
        reviewRatingLabel:"ให้คะแนน",
        reviewTextLabel:"รีวิว",
        reviewArmPinBtn:"กดปุ่ม แล้วคลิกบนแผนที่เพื่อ “ปักหมุด”",
        reviewSaveBtn:"บันทึกรีวิว",
        reviewListTitle:"รีวิวล่าสุด",
        reviewsTitle:"หมุด/รีวิวของฉัน",
        reviewsSub:"เปิดดูบนแผนที่ และลบ/แก้ไขได้เฉพาะของคุณ",
        camOpen:"ถ่ายภาพ",
        camSnap:"",
        camHint:"ใช้กล้องหลัง (ถ้ามี) แล้วกด “ถ่ายรูป”",
        pinAtMyLoc:" ปักหมุดที่ตำแหน่งฉัน",
        locDenied:"ไม่ได้รับอนุญาตตำแหน่ง หรือเปิด GPS/Permission ก่อน",
        camDenied:"ไม่สามารถเปิดกล้องได้",
        emailInvalid:"กรุณากรอกอีเมลให้ถูกต้อง",
        passInvalid:"กรุณากรอกรหัสผ่าน (อย่างน้อย 6 ตัวอักษร)",
        loginFailed:"อีเมลหรือรหัสผ่านไม่ถูกต้อง",
        adminNeedPasswordLogin:"แอดมินต้องล็อกอินด้วย Email + Password เท่านั้น",
        adminNotAllowed:"อีเมลนี้ไม่มีสิทธิ์เข้าโหมดแอดมิน",
        adminPassWrong:"รหัสผ่านแอดมินไม่ถูกต้อง",
        modelUnavailable:"ระบบจำแนกยังไม่พร้อมใช้งาน",
        mustPinBeforeReview:"ต้องปักหมุดก่อนจึงจะรีวิวได้",
        reviewSaved:"บันทึกรีวิวเรียบร้อย",
        profileTitle:"ตั้งค่าโปรไฟล์",
        profileSubtitle:"ปรับชื่อที่แสดง และการตั้งค่าพื้นฐาน",
        roleTitle:"สิทธิ์ผู้ใช้",
        saveProfile:"บันทึกโปรไฟล์",
        logout:"ออกจากระบบ",
        guestLimited:"Guest",
        userRole:"ผู้ใช้ทั่วไป",
        adminRole:"แอดมิน",
        pinAddedNowReview:"ปักหมุดแล้ว กรุณากรอกรีวิวด้านล่าง",
        unreviewed:"ยังไม่รีวิว",
        onlyOwnerDelete:"ลบได้เฉพาะหมุดของตัวเอง",
        confirmDelete:"ต้องการลบหมุดนี้หรือไม่?"
      },
      en: {
        appTitle:"Lanna Veg",
        appSubtitle:"Northern Thai vegetables, recipes & community map",
        navHome:"Home", navScan:"Scan", navVegs:"Vegetables", navMap:"Map", navReviews:"My reviews",
        loginLabel:"Login",
        loginTitle:"Login",
        loginSubtitle:"Login to pin & manage your reviews (Guest is limited)",
        loginGoogle:"Continue with Google",
        loginFacebook:"Continue with Facebook",
        loginInstagram:"Continue with Instagram",
        loginGuest:"Continue as guest",
        loginOr:"or",
        passwordLabel:"Password",
        loginBtn:"Login",
        goRegister:"Register with Email",
        adminNote:"Admin must login with Email + Password then long-press logo for 5 seconds",
        registerTitle:"Register",
        registerSubtitle:"Create an account to manage profile and reviews",
        nameLabel:"Display name",
        registerBtn:"Register",
        backLogin:"Back to login",
        homeTitle:"Explore Northern Thai vegetables with AI",
        homeSub:"Scan photos, learn uses, and discover places from the community map",
        homeHeroText:"Classify vegetables, see recipes/uses/local names, and explore community pinned locations—great for cultural food tourists and students.",
        btnGoScan:"Start scanning", btnGoMap:"Open map", btnGoVegs:"Browse knowledge",
        badgeAI:"AI classifier", badgeDB:"Knowledge base", badgeCommunity:"Community map",
        scanTitle:"Scan vegetable from photo",
        scanSub:"Upload an image or use camera, then let AI predict",
        scanUploadText:"Drop image here or click to select",
        scanUploadHint:"Supported: .jpg .jpeg .png",
        scanPreviewLabel:"Selected image:",
        scanBtn:"Classify vegetable",
        scanResultLabel:"Prediction:", scanResultConf:"Confidence:",
        scanSeeDetail:"See details", scanSeeOnMap:"Go to map",
        scanTipTitle:"Tip",
        scanTipBody:"If classification is unavailable, admin can set MODEL_API_URL on Home (long-press logo 5s)",
        vegsTitle:"Vegetable knowledge base",
        vegsSub:"Browse details: local names, uses, recipes, etc.",
        vegsDetailHint:"Select a vegetable card to view details",
        vegsSearchLabel:"Search", vegsGroupLabel:"Group", vegsGroupAll:"All",
        kbTipsTitle:"Tips",
        kbTipsBody:"Scan → open details → pin & review on the map",
        mapTitle:"Community map",
        mapSub:"Pin & explore places (you can review only after pinning)",
        mapNearMe:" Find places near me",
        reviewVegLabel:"Vegetable",
        reviewPlaceLabel:"Place name",
        reviewRatingLabel:"Rating",
        reviewTextLabel:"Review",
        reviewArmPinBtn:"1) Press, then click map to pin",
        reviewSaveBtn:"2) Save review (after pinning)",
        reviewListTitle:"Latest reviews",
        reviewsTitle:"Your pins & reviews",
        reviewsSub:"Open on map, delete/edit only your own pins",
        camOpen:"Open camera",
        camSnap:"Take photo",
        camHint:"Use back camera (if available) then tap Take photo",
        pinAtMyLoc:" Pin at my location (no review required)",
        locDenied:"Location permission denied or GPS off",
        camDenied:"Unable to open camera (needs HTTPS/localhost + permission)",
        emailInvalid:"Please enter a valid email",
        passInvalid:"Please enter password (min 6 chars)",
        loginFailed:"Invalid email or password",
        adminNeedPasswordLogin:"Admin must login with Email + Password",
        adminNotAllowed:"This email is not allowed for admin mode",
        adminPassWrong:"Wrong admin password",
        modelUnavailable:"Classification service is unavailable",
        mustPinBeforeReview:"Please pin first, then you can review",
        reviewSaved:"Review saved",
        profileTitle:"Profile settings",
        profileSubtitle:"Edit display name and basic settings",
        roleTitle:"Role",
        saveProfile:"Save profile",
        logout:"Logout",
        guestLimited:"Guest (limited)",
        userRole:"User",
        adminRole:"Admin",
        pinAddedNowReview:"Pin added. Please write a review below",
        unreviewed:"Not reviewed yet",
        onlyOwnerDelete:"Only owner can delete",
        confirmDelete:"Delete this pin?"
      }
    };
    const t = (lang, key) => (I18N[lang] && I18N[lang][key]) ? I18N[lang][key] : (I18N.en[key] || key);
    /***********************
     * DATA (placeholder for exam)
     * คุณสามารถแทนด้วยข้อมูลจากเอกสารจริงได้ภายหลัง
     ***********************/
    const VEGETABLES = [
      { key:"makwaen", thaiName:"มะแขว่น", otherNames:"Makwaen", sciName:"Zanthoxylum limonella", group:"เครื่องเทศ",
        nutrition:"ใยอาหาร • สารหอมระเหยตามธรรมชาติ", recipe:"คั่ว/ตำพริกแกง • ใส่น้ำพริก/แกงอ่อม • โรยเพิ่มกลิ่นหอมซ่า" },
      { key:"neem", thaiName:"สะเดา", otherNames:"Neem", sciName:"Azadirachta indica", group:"ผักพื้นบ้าน",
        nutrition:"ใยอาหาร • สารต้านอนุมูลอิสระตามธรรมชาติ", recipe:"ลวกเพื่อลดความขม • กินคู่ปลาย่าง/น้ำปลาหวาน • ใส่แกงบางพื้นที่" },
      { key:"paracress", thaiName:"ผักคราด", otherNames:"Para Cress", sciName:"Acmella oleracea", group:"ผักพื้นบ้าน",
        nutrition:"ใยอาหาร • วิตามินตามธรรมชาติ (ขึ้นกับความสด)", recipe:"กินสดแนม • ใส่ยำ/ส้มตำ • ผัดเร็วไฟแรงให้กรอบ" },
      { key:"rattailed_radish", thaiName:"ผักขี้หูด", otherNames:"French radis", sciName:"Raphanus sativus", group:"ผักพื้นบ้าน",
        nutrition:"วิตามิน C • ใยอาหาร • น้ำสูง", recipe:"กินสด/สลัด • ดองเปรี้ยว • ลวกจิ้มน้ำพริก" },
      { key:"tupistra", thaiName:"นางแลว", otherNames:"Tupistra", sciName:"Tupistra albiflora", group:"ผักพื้นบ้าน",
        nutrition:"ใยอาหาร • แร่ธาตุจากพืชใบเขียว", recipe:"ลวก/นึ่งจิ้มน้ำพริก • แกงแค/แกงผักรวม • ผัดกระเทียม" },
      { key:"salae", thaiName:"สะแล", otherNames:"Salae", sciName:"Bauhinia sp.", group:"ผักพื้นบ้าน",
        nutrition:"ใยอาหาร • วิตามินจากยอดอ่อน", recipe:"แกงแค • ลวกจิ้มน้ำพริก • ผัดน้ำมันหอย" }];
    const findVeg = (key) => VEGETABLES.find(v => v.key === key) || null;
    const tryMatchVegKey = (labelOrKey) => {
      const s = String(labelOrKey || "").trim();
      if(!s) return null;
      const direct = findVeg(s);
      if(direct) return direct.key;
      const byThai = VEGETABLES.find(v => (v.thaiName || "").trim() === s);
      if(byThai) return byThai.key;
      return null;
    };
    /***********************
     * STORAGE KEYS
     ***********************/
    const KEYS = {
      prefs: "vegExplorer.prefs",
      session: "vegExplorer.session",
      markers: "vegExplorer.markers",
      adminPanel: "vegExplorer.adminPanel",
      accounts: "vegExplorer.accounts" // local email accounts (exam mode)
    };
    const safeJson = (s, fallback) => { try { return JSON.parse(s); } catch(e){ return fallback; } };
    const loadPrefs = () => safeJson(localStorage.getItem(KEYS.prefs) || "{}", {});
    const savePrefs = (p) => localStorage.setItem(KEYS.prefs, JSON.stringify(p || {}));
    const loadSession = () => safeJson(localStorage.getItem(KEYS.session) || "null", null);
    const saveSession = (u) => localStorage.setItem(KEYS.session, JSON.stringify(u));
    const loadMarkers = () => safeJson(localStorage.getItem(KEYS.markers) || "[]", []);
    const saveMarkers = (m) => localStorage.setItem(KEYS.markers, JSON.stringify(m || []));
    const loadAccounts = () => safeJson(localStorage.getItem(KEYS.accounts) || "[]", []);
    const saveAccounts = (a) => localStorage.setItem(KEYS.accounts, JSON.stringify(a || []));
    /***********************
     * UTILS
     ***********************/
    const uuid = (prefix="id") =>
      (crypto?.randomUUID ? `${prefix}-${crypto.randomUUID()}` : `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`);
    const escapeHtml = (s) => String(s ?? "")
      .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
      .replaceAll('"',"&quot;").replaceAll("'","&#39;");
    const haversineKm = (lat1, lon1, lat2, lon2) => {
      const R=6371, toRad=d=>d*Math.PI/180;
      const dLat=toRad(lat2-lat1), dLon=toRad(lon2-lon1);
      const a=Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
      return 2*R*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    };
    const isValidEmail = (email)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email||"").trim());
    const minPassOk = (pass)=>String(pass||"").length>=6;
    // UI must not show error logs
    function softError(tag, err){
      console.error(tag, err);
    }

    // Review modal helpers
    function openReviewModal(){
      const id = app.pendingReviewMarkerId;
      if(!id) return;
      // fill place from current inputs
      const place = (document.getElementById("reviewPlace").value||"").trim();
      document.getElementById("modalPlace").value = place;
      document.getElementById("reviewModal").classList.remove("hidden");
    }
    function closeReviewModal(){
      document.getElementById("reviewModal").classList.add("hidden");
      document.getElementById("modalComment").value = "";
    }
    /***********************
     * APP STATE
     ***********************/
    const app = {
      prefs: {},
      lang: CONFIG.DEFAULT_LANG,
      modelApiUrl: CONFIG.MODEL_API_URL,
      session: null, // {id, provider, name, email, role, hasPasswordLogin}
      markers: [],
      lastScan: null,
      gmap: null,
      gMarkers: new Map(),
      myLocation: null,
      myLocMarker: null,
      adminPanelOn: false,
      pendingReviewMarkerId: null,
      get isGuest(){ return !this.session || this.session.provider==="guest"; },
      get isAdmin(){ return !!this.session && this.session.role==="admin"; },
      savePrefs(){ savePrefs(this.prefs); },
      // theme selector removed
      applyI18n(){
        document.querySelectorAll("[data-i18n]").forEach(el=>{
          const key = el.getAttribute("data-i18n");
          el.textContent = t(this.lang, key);
        });
        document.querySelectorAll(".pill-lang").forEach(el=>{
          el.classList.toggle("opacity-60", el.getAttribute("data-lang")!==this.lang);
        });
        // no theme toggle
      },
      showView(route){
        document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
        const el = document.getElementById(`view-${route}`);
        if(el) el.classList.add("active");
        document.querySelectorAll(".nav-link").forEach(btn=>{
          btn.classList.remove("navActive");
          if(btn.getAttribute("data-route")===route) btn.classList.add("navActive");
        });
        if(route==="map"){
          // Lazy init map to avoid app-wide crash if Leaflet CDN is blocked/offline
          if(!this.gmap){
            try{
              if(window.google && google.maps){
                initMap();
              }else{
                console.error("Google Maps not loaded. Check GOOGLE_MAPS_API_KEY and network.");
                const mapEl=document.getElementById("map");
                if(mapEl) mapEl.innerHTML='<div style="padding:16px;font-weight:800;color:#64748b;">Map unavailable (Google Maps not loaded)</div>';
              }
            }catch(e){ console.error("[MAP] init failed", e); }
          }
          setTimeout(()=>{ try { google?.maps?.event?.trigger?.(this.gmap, "resize"); } catch(e){} }, 250);
        }
      },
      route(route){
        // protect profile for guest -> go login
        if(route==="profile" && this.isGuest){
          this.showView("login");
          return;
        }
        this.showView(route);
      },
      updateHeaderUI(){
        const userName = document.getElementById("userName");
        const rolePill = document.getElementById("rolePill"); // may be absent in UI
        const authBtnLabel = document.getElementById("authBtnLabel");
        if(this.isGuest){
          userName.textContent = "Guest";
          if(rolePill) rolePill.classList.add("hidden");
          authBtnLabel.textContent = t(this.lang,"loginLabel");
        }else{
          userName.textContent = this.session.name || "User";
          if(rolePill) rolePill.classList.remove("hidden");
          if(rolePill) rolePill.textContent = (this.session.role || "user").toUpperCase();
          authBtnLabel.textContent = t(this.lang,"logout"); // button still routes login but acts as logout
        }
      },
      logout(){
        const msg = (this.lang==="th") ? "ยืนยันการออกจากระบบ?" : "Confirm logout?";
        if(!confirm(msg)) return;
        // clear local session immediately
        this.session = { id: uuid("guest"), provider:"guest", name:"Guest", email:"", role:"guest", hasPasswordLogin:false };
        saveSession(this.session);
        this.setAdminPanel(false);
        this.updateHeaderUI();
        // clear server session (Google OAuth / Flask)
        window.location.href = "/logout";
      },
      setSession(sessionObj){
        this.session = sessionObj;
        saveSession(sessionObj);
        this.updateHeaderUI();
      },
      // Social buttons create a normal user session (not admin)
      socialLogin(provider, email){
        const nm = this.lang==="th" ? "ผู้ใช้" : "User";
        const user = {
          id: uuid(provider),
          provider,
          name: nm,
          email: String(email||"").trim(),
          role: "user",
          hasPasswordLogin: false
        };
        this.setSession(user);
        this.setAdminPanel(false);
        this.route("home");
      },
      // Email+Password login (user or admin if matches whitelist+admin pass)
      emailPasswordLogin: async function(email, pass){
        const e = String(email||"").trim().toLowerCase();
        const p = String(pass||"");
        try{
          const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            credentials: "include",
            body: JSON.stringify({ email: e, password: p })
          });
          if(!res.ok){
            const msg = await res.text();
            alert(msg || t(this.lang,"loginFailed"));
            return false;
          }
          // sync session from server
          const meRes = await fetch("/api/me", { credentials:"include" });
          if(meRes.ok){
            const me = await meRes.json();
            if(me && me.logged_in && me.user){
              this.setSession(me.user);
              this.setAdminPanel(me.user.role==="admin" && me.user.hasPasswordLogin && isAdminEmail(me.user.email));
              this.route("home");
              return true;
            }
          }
          alert(t(this.lang,"loginFailed"));
          return false;
        }catch(err){
          console.error(err);
          alert(t(this.lang,"loginFailed"));
          return false;
        }
      },
registerEmailAccount: async function(name, email, pass){
        const e = String(email||"").trim().toLowerCase();
        const p = String(pass||"");
        const n = String(name||"").trim() || "User";
        if(!isValidEmail(e)){ alert(t(this.lang,"emailInvalid")); return false; }
        if(!minPassOk(p)){ alert(t(this.lang,"passInvalid")); return false; }
        try{
          const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            credentials: "include",
            body: JSON.stringify({ name: n, email: e, password: p })
          });
          if(!res.ok){
            const msg = await res.text();
            alert(msg || (this.lang==="th" ? "สมัครสมาชิกไม่สำเร็จ" : "Register failed"));
            return false;
          }
          const meRes = await fetch("/api/me", { credentials:"include" });
          if(meRes.ok){
            const me = await meRes.json();
            if(me && me.logged_in && me.user){
              this.setSession(me.user);
              this.setAdminPanel(false);
              this.route("home");
              return true;
            }
          }
          this.route("home");
          return true;
        }catch(err){
          console.error(err);
          alert(this.lang==="th" ? "สมัครสมาชิกไม่สำเร็จ" : "Register failed");
          return false;
        }
      },
      setAdminPanel(on){
        this.adminPanelOn = !!on;
        localStorage.setItem(KEYS.adminPanel, this.adminPanelOn ? "1" : "0");
        const adminBox = document.getElementById("adminOnly");
        if(adminBox) adminBox.classList.toggle("hidden", !this.adminPanelOn);
      },
      openVegDetail(vegKey){
        const veg = findVeg(vegKey);
        if(!veg) return;
        this.route("vegs");
        renderVegDetail(veg);
      },
      focusMarker(id){
        const m = this.markers.find(x=>x.id===id);
        if(!m || !this.gmap) return;
        try{
          this.gmap.panTo({lat: m.lat, lng: m.lng});
          this.gmap.setZoom(14);
          this.gMarkers.get(id)?.info?.open({map: this.gmap, anchor: this.gMarkers.get(id).marker});
        }catch(e){ softError("[MAP focus]", e); }
      },
      markerPopupHtml(m){
        const canDelete = (!this.isGuest) && (m.ownerId === this.session.id);
        const reviewed = (m.rating != null) && String(m.text||"").trim().length>0;
        const stars = m.rating ? "★".repeat(Math.max(1, Math.min(5, m.rating || 0))) : "";
        const status = reviewed
          ? `<small style="display:block;margin-top:6px;color:#059669;font-weight:900;">✓ ${this.lang==="th"?"มีรีวิว":"Reviewed"}</small>`
          : `<small style="display:block;margin-top:6px;color:#64748b;font-weight:900;">• ${t(this.lang,"unreviewed")}</small>`;
        const del = canDelete
          ? `<button data-del="${m.id}" style="margin-top:8px;padding:6px 12px;border-radius:999px;border:1px solid #94a3b8;background:#e2e8f0;font-size:12px;cursor:pointer;font-weight:900;">
              ${this.lang==="th"?"ลบหมุดนี้":"Delete pin"}
            </button>`
          : ``;
        return `
          <div style="font-size:13px;line-height:1.4;">
            <strong>${escapeHtml(m.place)}</strong><br/>
            ${this.lang==="th"?"ผัก: ":"Vegetable: "}${escapeHtml(m.vegName)}<br/>
            ${m.rating ? `${this.lang==="th"?"ดาว: ":"Rating: "}${stars}<br/>` : ``}
            ${m.text ? `<small>${escapeHtml(m.text)}</small>` : ``}
            ${status}
            ${del}
          </div>
        `;
      },
      async renderMapMarkers(){
        if(!this.gmap) return;
        // clear old
        this.gMarkers.forEach(obj=>{ try{ obj.marker.setMap(null); }catch(e){} });
        this.gMarkers.clear();
        for(const m of this.markers){
          const marker = new google.maps.Marker({
            position: {lat: m.lat, lng: m.lng},
            map: this.gmap,
            title: m.place_name || m.place || "",
          });
          const info = new google.maps.InfoWindow({ content: this.markerPopupHtml(m) });
          marker.addListener("click", ()=> info.open({map: this.gmap, anchor: marker}));
          this.gMarkers.set(m.id, {marker, info});
        }
        renderReviewsLists();
      },
      async loadMarkersFromServer(filters={}){
        const qs = new URLSearchParams(filters);
        const res = await fetch(`/api/markers?${qs.toString()}`, { credentials:'include' });
        if(!res.ok) return [];
        const data = await res.json();
        const rows = (data && data.ok) ? (data.markers||[]) : [];
        // normalize for UI
        this.markers = rows.map(r=>({
          id: r.id,
          vegKey: r.veg_key,
          vegName: r.thai_name,
          place: r.place_name,
          province: r.province,
          lat: Number(r.lat),
          lng: Number(r.lon),
          ownerId: String(r.user_id),
          rating: r.avg_rating ? Math.round(Number(r.avg_rating)) : null,
          text: "",
          time: r.created_at,
          reviewCount: Number(r.review_count||0)
        }));
        await this.renderMapMarkers();
        renderReviewsLists();
        return this.markers;
      },
      async addPinOnly({ vegKey, place, province, lat, lng }){
        if(this.isGuest){
          alert(this.lang==="th" ? "กรุณาเข้าสู่ระบบก่อนปักหมุด" : "Please login before pinning");
          return null;
        }
        const res = await fetch('/api/markers', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          credentials:'include',
          body: JSON.stringify({ veg_key: vegKey, place_name: place, province: province||"", lat, lon: lng })
        });
        if(!res.ok){
          const e = await res.json().catch(()=>({}));
          alert(this.lang==="th" ? "บันทึกหมุดไม่สำเร็จ" : "Failed to save pin");
          return null;
        }
        const data = await res.json();
        await this.loadMarkersFromServer();
        return data.marker_id;
      },
      async saveReviewToMarker(markerId, rating, text){
        if(this.isGuest){
          alert(this.lang==="th" ? "กรุณาเข้าสู่ระบบก่อนรีวิว" : "Please login before reviewing");
          return false;
        }
        const res = await fetch('/api/reviews', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          credentials:'include',
          body: JSON.stringify({ marker_id: markerId, rating, comment: text })
        });
        if(!res.ok){
          alert(this.lang==="th" ? "บันทึกรีวิวไม่สำเร็จ" : "Failed to save review");
          return false;
        }
        await this.loadMarkersFromServer();
        return true;
      },
      deleteMarker(id){
        // deleting pins is admin-only in production; not exposed in client UI
      },
      setMyLocation(lat,lng){
        this.myLocation = { lat, lng };
        if(!this.gmap) return;
        try{ this.myLocMarker?.setMap(null); }catch(e){ }
        (async ()=>{
          const obj = await createGMarker({
            position: {lat, lng},
            map: this.gmap,
            title: this.lang==="th" ? "ตำแหน่งของคุณ" : "Your location",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillOpacity: 0.9,
              strokeWeight: 2,
            }
          });
          this.myLocMarker = obj.marker;
        })();
      }
    };
    /***********************
     * RENDER: Veg Detail + List
     ***********************/
    function renderVegDetail(v){
      const box = document.getElementById("vegDetailBox");
      box.innerHTML = `
        <div class="space-y-2">
          <div>
            <div class="text-base md:text-lg font-black text-emerald-700 dark:text-emerald-300">${escapeHtml(v.thaiName||"-")}</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">
              ${v.localName ? (app.lang==="th"?"ชื่อท้องถิ่น: ":"Local: ")+escapeHtml(v.localName) : ""}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">${escapeHtml(v.otherNames||"")}</div>
            <div class="text-sm italic text-slate-500 dark:text-slate-400">${escapeHtml(v.sciName||"")}</div>
          </div>
          <div class="text-sm md:text-base text-slate-700 dark:text-slate-200"><b>${app.lang==="th"?"กลุ่ม: ":"Group: "}</b>${escapeHtml(v.group||"-")}</div>
          <div class="text-sm md:text-base text-slate-700 dark:text-slate-200"><b>${app.lang==="th"?"สรรพคุณ: ":"Uses: "}</b>${escapeHtml(v.medicinal||"-")}</div>
          <div class="text-sm md:text-base text-slate-700 dark:text-slate-200"><b>${app.lang==="th"?"เมนู: ":"Recipes: "}</b>${escapeHtml(v.recipe||"-")}</div>
          <div class="text-sm md:text-base text-slate-700 dark:text-slate-200"><b>${app.lang==="th"?"หมายเหตุ: ":"Note: "}</b>${escapeHtml(v.note||"-")}</div>
        </div>
      `;
    }
    function renderVegList(){
      const grid = document.getElementById("vegGrid");
      const summary = document.getElementById("resultSummary");
      const q = (document.getElementById("searchInput").value || "").trim().toLowerCase();
      const group = document.getElementById("groupSelect").value || "";
      const filtered = VEGETABLES.filter(v=>{
        if(group && v.group !== group) return false;
        if(q){
          const text = `${v.thaiName} ${v.localName||""} ${v.sciName||""} ${v.medicinal||""} ${v.recipe||""} ${v.note||""}`.toLowerCase();
          if(!text.includes(q)) return false;
        }
        return true;
      });
      grid.innerHTML = "";
      for(const v of filtered){
        const card = document.createElement("article");
        card.className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 p-3 hover:border-emerald-300/80 hover:bg-emerald-50/40 dark:hover:bg-emerald-900/30 cursor-pointer transition shadow-sm hover:shadow-soft";
        card.innerHTML = `
          <div class="text-base font-black text-emerald-700 dark:text-emerald-300">${escapeHtml(v.thaiName)}</div>
          <div class="text-sm text-slate-500 dark:text-slate-400 italic">${escapeHtml(v.sciName||"")}</div>
          <div class="text-sm text-slate-700 dark:text-slate-200 mt-2"><b>${app.lang==="th"?"สรรพคุณ: ":"Uses: "}</b>${escapeHtml(v.medicinal||"-")}</div>
        `;
        card.addEventListener("click", ()=> app.openVegDetail(v.key));
        grid.appendChild(card);
      }
      summary.textContent = app.lang==="th"
        ? `พบ ${filtered.length} รายการ จากทั้งหมด ${VEGETABLES.length}`
        : `Found ${filtered.length} of ${VEGETABLES.length}`;
    }
    /***********************
     * RENDER: Reviews Lists
     ***********************/
    function renderReviewsLists(){
      const listMap = document.getElementById("reviewList");
      const listPage = document.getElementById("reviewListPage");
      if(!listMap || !listPage) return;
      const sorted = [...app.markers].sort((a,b)=>(b.time||"").localeCompare(a.time||""));
      const empty = app.lang==="th" ? "ยังไม่มีหมุด/รีวิวในเครื่องนี้" : "No pins/reviews in this browser yet";
      listMap.innerHTML = "";
      listPage.innerHTML = "";
      if(!sorted.length){
        listMap.innerHTML = `<p class="text-sm text-slate-500 dark:text-slate-400">${empty}</p>`;
        listPage.innerHTML = `<p class="text-sm text-slate-500 dark:text-slate-400">${empty}</p>`;
        return;
      }
      const rowHtml = (m, compact=false)=>{
        const isOwner = (!app.isGuest) && (m.ownerId === app.session.id);
        const when = new Date(m.time).toLocaleString(app.lang==="th" ? "th-TH" : "en-US");
        const reviewed = (m.rating != null) && String(m.text||"").trim().length>0;
        const ratingText = reviewed ? ("★".repeat(m.rating)) : `• ${t(app.lang,"unreviewed")}`;
        return `
          <div class="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/60 dark:bg-slate-950/25 p-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="text-base font-black text-emerald-700 dark:text-emerald-300">${escapeHtml(m.place)}</div>
                <div class="text-sm text-slate-500 dark:text-slate-400">
                  ${app.lang==="th"?"ผัก: ":"Vegetable: "}${escapeHtml(m.vegName)} |
                  ${app.lang==="th"?"สถานะ: ":"Status: "}${ratingText} | ${when}
                </div>
              </div>
              <button class="underline text-emerald-700 dark:text-emerald-300 font-black" data-view="${m.id}">
                ${app.lang==="th"?"ดูบนแผนที่":"View"}
              </button>
            </div>
            ${m.text ? `<div class="text-sm md:text-base text-slate-700 dark:text-slate-200 mt-2">${escapeHtml(m.text)}</div>` : ``}
            <div class="flex flex-wrap gap-4 mt-2 font-black">
              ${isOwner ? `
                <button class="underline text-emerald-700 dark:text-emerald-300" data-edit="${m.id}">
                  ${app.lang==="th"?"แก้ไขรีวิว":"Edit review"}
                </button>
                <button class="underline text-red-500 dark:text-red-400" data-del="${m.id}">
                  ${app.lang==="th"?"ลบหมุด":"Delete pin"}
                </button>
              ` : ``}
            </div>
          </div>
        `;
      };
      // For "Latest reviews" show top 8
      const latest = sorted.slice(0,8);
      for(const m of latest){
        const a = document.createElement("div"); a.innerHTML = rowHtml(m,true);
        listMap.appendChild(a);
      }
      for(const m of sorted){
        const b = document.createElement("div"); b.innerHTML = rowHtml(m,false);
        listPage.appendChild(b);
      }
      [listMap, listPage].forEach(list=>{
        list.querySelectorAll("[data-view]").forEach(btn=>{
          btn.addEventListener("click", ()=>{
            const id = Number(btn.getAttribute("data-view"));
            app.route("map");
            setTimeout(()=> app.focusMarker(id), 300);
          });
        });
        list.querySelectorAll("[data-del]").forEach(btn=>{
          btn.addEventListener("click", ()=>{
            const id = Number(btn.getAttribute("data-del"));
            const m = app.markers.find(x=>x.id===id);
            if(!m) return;
            if(app.isGuest || m.ownerId !== app.session.id){
              alert(t(app.lang,"onlyOwnerDelete"));
              return;
            }
            if(!confirm(t(app.lang,"confirmDelete"))) return;
            app.deleteMarker(id);
          });
        });
        // Edit -> load into form + set pending marker
        list.querySelectorAll("[data-edit]").forEach(btn=>{
          btn.addEventListener("click", ()=>{
            const id = Number(btn.getAttribute("data-edit"));
            const m = app.markers.find(x=>x.id===id);
            if(!m) return;
            if(app.isGuest || m.ownerId !== app.session.id){
              alert(t(app.lang,"onlyOwnerDelete"));
              return;
            }
            app.route("map");
            setTimeout(()=>{
              document.getElementById("reviewVeg").value = m.vegKey;
              document.getElementById("reviewPlace").value = m.place;
              document.getElementById("reviewRating").value = m.rating || "5";
              document.getElementById("reviewText").value = m.text || "";
              app.pendingReviewMarkerId = id;
              app.focusMarker(id);
            }, 300);
          });
        });
      });
    }
    /***********************
     * SCAN: API ONLY
     ***********************/
    let scanFile = null;
    async function classifyImage(file){
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch(app.modelApiUrl, { method:"POST", body: fd });
      if(!res.ok) throw new Error(`Model API error ${res.status}`);
      const data = await res.json();
      const classKey = data.classKey || tryMatchVegKey(data.label) || null;
      const alternatives = (data.alternatives || []).map(a => ({
        label: a.label,
        confidence: a.confidence ?? 0,
        classKey: a.classKey || tryMatchVegKey(a.label) || null
      }));
      return { label: data.label ?? "", confidence: data.confidence ?? 0, classKey, alternatives };
    }
    /***********************
     * CAMERA (no close button)
     ***********************/
    let camStream = null;
    let camReady = false;
    function stopCamera(){
      try{ camStream?.getTracks?.().forEach(t=>t.stop()); }catch(e){ softError("[CAM stop]", e); }
      camStream = null;
      camReady = false;
      const camBox = document.getElementById("camBox");
      const video = document.getElementById("camVideo");
      const openCamBtn = document.getElementById("openCamBtn");
      const snapBtn = document.getElementById("snapBtn");
      if(video) video.srcObject = null;
      camBox?.classList.add("hidden");
      snapBtn && (snapBtn.disabled = true);
      openCamBtn && (openCamBtn.disabled = false);
    }
    async function startCamera(){
      const camBox = document.getElementById("camBox");
      const video = document.getElementById("camVideo");
      const openCamBtn = document.getElementById("openCamBtn");
      const snapBtn = document.getElementById("snapBtn");
      try{
        openCamBtn && (openCamBtn.disabled = true);
        if(!navigator.mediaDevices?.getUserMedia) throw new Error("getUserMedia not supported");
        camStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false
        });
        camBox?.classList.remove("hidden");
        video.srcObject = camStream;
        await new Promise(r=>setTimeout(r,200));
        camReady = true;
        snapBtn && (snapBtn.disabled = false);
      }catch(err){
        stopCamera();
        softError("[CAMERA]", err);
        alert(t(app.lang,"camDenied"));
      }
    }
    async function snapPhotoToFile(){
      if(!camReady) return null;
      const video = document.getElementById("camVideo");
      const canvas = document.getElementById("camCanvas");
      if(!video || !canvas) return null;
      const w = video.videoWidth || 1280;
      const h = video.videoHeight || 720;
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, w, h);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", 0.92));
      if(!blob) return null;
      const file = new File([blob], `camera-${Date.now()}.jpg`, { type: "image/jpeg" });
      const preview = document.getElementById("preview");
      const previewImage = document.getElementById("previewImage");
      previewImage.src = canvas.toDataURL("image/jpeg", 0.92);
      preview.classList.remove("hidden");
      return file;
    }
    /***********************
     * MAP
     ***********************/
    // Google Maps Marker helper (supports new AdvancedMarkerElement; falls back to classic Marker)
    async function createGMarker(opts){
      const { position, map, title, html, icon } = opts || {};
      const info = html ? new google.maps.InfoWindow({ content: html }) : null;

      // Prefer AdvancedMarkerElement (new API) when available
      try{
        if(google?.maps?.importLibrary){
          // marker library is requested in script URL, but importLibrary makes sure it's ready
          await google.maps.importLibrary("marker");
        }
        const Adv = google?.maps?.marker?.AdvancedMarkerElement;
        if(Adv){
          const content = document.createElement("div");
          content.style.transform = "translate(0, 0)";
          content.style.cursor = "pointer";
          if(icon && icon.path === google.maps.SymbolPath.CIRCLE){
            // simple dot marker for "my location"
            content.style.width = "14px";
            content.style.height = "14px";
            content.style.borderRadius = "999px";
            content.style.background = "rgba(16,185,129,.95)";
            content.style.boxShadow = "0 0 0 3px rgba(16,185,129,.25)";
          }else{
            // default pin-ish dot (keeps it lightweight)
            content.style.width = "12px";
            content.style.height = "12px";
            content.style.borderRadius = "999px";
            content.style.background = "rgba(15,23,42,.85)";
          }
          const marker = new Adv({ position, map, title, content });
          if(info){
            marker.addListener("gmp-click", ()=> info.open({ map, anchor: marker }));
          }
          return { marker, info };
        }
      }catch(e){
        // fall back to classic Marker
      }

      // Classic Marker fallback (deprecated but still supported)
      const marker = new google.maps.Marker({ position, map, title, icon });
      if(info){
        marker.addListener("click", ()=> info.open({ map, anchor: marker }));
      }
      return { marker, info };
    }

    function initMap(){
      const nearBtn = document.getElementById("nearMeBtn");
      const nearStatus = document.getElementById("nearMeStatus");
      const nearStatusMobile = document.getElementById("nearMeStatusMobile");
      const armPinBtn = document.getElementById("armPinBtn");
      const pinMyLocBtn = document.getElementById("pinMyLocBtn");
      const sel = document.getElementById("reviewVeg");
      sel.innerHTML = "";
      VEGETABLES.forEach(v=>{
        const opt = document.createElement("option");
        opt.value = v.key;
        opt.textContent = v.thaiName;
        sel.appendChild(opt);
      });

      // Guard: Google Maps key missing
      if(typeof google==='undefined' || !google.maps){
        const mapBox = document.getElementById("map");
        if(mapBox){
          mapBox.innerHTML = '<div class="p-4 text-sm text-slate-600">Google Maps API Key ยังไม่ได้ตั้งค่า (GOOGLE_MAPS_API_KEY) — กรุณาตั้งค่าในไฟล์ .env / ตัวแปรระบบ</div>';
        }
        return;
      }

      const mapDiv = document.getElementById("map");
      if(!mapDiv){
        console.error("[MAP] #map element not found");
        return;
      }

      const { lat, lng, zoom } = CONFIG.MAP_DEFAULT;
      app.gmap = new google.maps.Map(mapDiv, {
        center: {lat, lng},
        zoom,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      mapId: "PUT_YOUR_MAP_ID_HERE",
      gestureHandling: "greedy",
      draggable: true,
      scrollwheel: true,

});

      // load markers from server
      app.loadMarkersFromServer();

      // realtime location
      if(navigator.geolocation){
        navigator.geolocation.watchPosition((pos)=>{
          app.setMyLocation(pos.coords.latitude, pos.coords.longitude);
        }, (err)=>softError("[GEO:watch]", err), { enableHighAccuracy:true, maximumAge:10000 });
      }

      // Arm pin: requires login
      armPinBtn.addEventListener("click", ()=>{
        if(app.isGuest){
          alert(app.lang==="th" ? "กรุณาเข้าสู่ระบบก่อนปักหมุด" : "Please login before pinning");
          app.route("login");
          return;
        }
        armPinBtn.textContent = app.lang==="th" ? "แตะบนแผนที่เพื่อปักหมุด" : "Tap on map to pin";
        const listener = app.gmap.addListener("click", async (e)=>{
          google.maps.event.removeListener(listener);
          armPinBtn.textContent = t(app.lang,"reviewArmPinBtn");

          const vegKey = document.getElementById("reviewVeg").value;
          const place = (document.getElementById("reviewPlace").value||"").trim() || (app.lang==="th"?"ไม่ระบุชื่อสถานที่":"Unnamed place");
          const province = (document.getElementById("reviewProvince").value||"").trim();

          const markerId = await app.addPinOnly({
            vegKey,
            place,
            province,
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
          if(markerId){
            // open review modal popup
            app.pendingReviewMarkerId = markerId;
            openReviewModal();
          }
        });
      });

      // pin from current location
      pinMyLocBtn.addEventListener("click", async ()=>{
        if(app.isGuest){
          alert(app.lang==="th" ? "กรุณาเข้าสู่ระบบก่อนปักหมุด" : "Please login before pinning");
          app.route("login");
          return;
        }
        if(app.myLocation){
          const vegKey = document.getElementById("reviewVeg").value;
          const place = (document.getElementById("reviewPlace").value||"").trim() || (app.lang==="th"?"ไม่ระบุชื่อสถานที่":"Unnamed place");
          const province = (document.getElementById("reviewProvince").value||"").trim();
          const markerId = await app.addPinOnly({ vegKey, place, province, lat: app.myLocation.lat, lng: app.myLocation.lng });
          if(markerId){ app.pendingReviewMarkerId = markerId; openReviewModal(); }
          return;
        }
        alert(t(app.lang,"locDenied"));
      });

      // near me
      nearBtn.addEventListener("click", ()=>{
        const msg = app.lang==="th" ? "กำลังขอตำแหน่ง..." : "Requesting location...";
        nearStatus.textContent = msg; nearStatusMobile.textContent = msg;
        if(!navigator.geolocation){
          const m = app.lang==="th" ? "เบราว์เซอร์ไม่รองรับตำแหน่ง" : "Geolocation not supported";
          nearStatus.textContent = m; nearStatusMobile.textContent = m;
          return;
        }
        navigator.geolocation.getCurrentPosition((pos)=>{
          const { latitude, longitude } = pos.coords;
          app.setMyLocation(latitude, longitude);
          app.gmap.panTo({lat: latitude, lng: longitude});
          app.gmap.setZoom(13);
          nearStatus.textContent = app.lang==="th" ? "ปรับแผนที่ไปยังตำแหน่งของคุณแล้ว" : "Map centered on your location";
          nearStatusMobile.textContent = nearStatus.textContent;
        }, (err)=>{
          softError("[GEO:nearMe]", err);
          const m = t(app.lang,"locDenied");
          nearStatus.textContent = m; nearStatusMobile.textContent = m;
        }, { enableHighAccuracy:true, timeout:12000 });
      });
    }
/***********************
     * UI BIND
     ***********************/
    // expose for Google Maps callback
    window.initMap = initMap;

    function bindUI(){
      // logo click -> home
      const logoEl = document.getElementById('logoPress');
      if(logoEl){ logoEl.addEventListener('click', ()=> app.route('home')); }
      // review modal
      on("reviewModalClose","click", closeReviewModal);
      on("reviewModalCancel","click", closeReviewModal);
      on("reviewModalSave","click", async ()=>{
        const id = app.pendingReviewMarkerId;
        if(!id) return closeReviewModal();
        const rating = parseInt(document.getElementById("modalRating").value||"5",10);
        const comment = (document.getElementById("modalComment").value||"").trim();
        const ok = await app.saveReviewToMarker(id, rating, comment);
        if(ok){ app.pendingReviewMarkerId=null; closeReviewModal(); app.route("reviews"); }
      });
      // nav
      document.querySelectorAll(".nav-link").forEach(btn=>{
        btn.addEventListener("click", ()=> app.route(btn.getAttribute("data-route")));
      });
      document.querySelectorAll("[data-go]").forEach(btn=>{
        btn.addEventListener("click", ()=> app.route(btn.getAttribute("data-go")));
      });
      // language
      on("langToggle","click", ()=>{
        app.lang = (app.lang==="th") ? "en" : "th";
        app.prefs.lang = app.lang;
        app.savePrefs();
        app.applyI18n();
        renderVegList();
        renderReviewsLists();
        app.renderMapMarkers();
        app.updateHeaderUI();
      });
      // theme selector removed (client requirement)
      // profile button
      on("profileBtn","click", ()=>{
        if(app.isGuest) app.route("login");
        else app.route("profile");
      });
      // auth button: if logged-in -> logout then go login; if guest -> go login
      on("authBtn","click", ()=>{
        if(app.isGuest){
          app.route("login");
        }else{
          app.logout();
        }
      });
      // register navigation
      on("btnGoRegister","click", ()=> app.route("register"));
      on("btnBackToLogin","click", ()=> app.route("login"));
      // register
      on("btnRegisterEmail","click", async ()=>{
        const name = (document.getElementById("regName").value||"").trim();
        const email = (document.getElementById("regEmail").value||"").trim();
        const pass = (document.getElementById("regPass").value||"");
        await app.registerEmailAccount(name, email, pass);
      });
      // social login buttons: open provider auth page (OAuth placeholders)
      const openOauth = (btnId) => {
        const el = document.getElementById(btnId);
        const href = el?.getAttribute("data-oauth-href");
        if (!href) return;
        window.location.href = href;
      };
      on("btnLoginGoogle","click", ()=> openOauth("btnLoginGoogle"));
      // keep only Google OAuth for users (professional scope)

      // guest
      on("btnGuest","click", ()=>{
        const guest = { id: uuid("guest"), provider:"guest", name:"Guest", email:"", role:"guest", hasPasswordLogin:false };
        app.setSession(guest);
        app.setAdminPanel(false);
        app.route("home");
      });
      // email+password login
      on("btnLoginEmail","click", async ()=>{
        const email = (document.getElementById("loginEmail").value||"").trim();
        const pass = (document.getElementById("loginPass").value||"");
        if(!isValidEmail(email)){ alert(t(app.lang,"emailInvalid")); return; }
        if(!minPassOk(pass)){ alert(t(app.lang,"passInvalid")); return; }
        await app.emailPasswordLogin(email, pass);
      });
      // profile save + logout
      on("saveProfileBtn","click", ()=>{
        if(app.isGuest) { app.route("login"); return; }
        const nm = (document.getElementById("profileName").value||"").trim();
        if(nm){
          app.session.name = nm;
          saveSession(app.session);
          // update local account name if email user
          if(app.session.provider==="email" && app.session.role==="user"){
            const accounts = loadAccounts();
            const idx = accounts.findIndex(a => String(a.email).toLowerCase() === String(app.session.email).toLowerCase());
            if(idx>=0){ accounts[idx].name = nm; saveAccounts(accounts); }
          }
          app.updateHeaderUI();
          alert(app.lang==="th"?"บันทึกแล้ว":"Saved");
        }
      });
      on("logoutBtn2","click", ()=> app.logout());
      // theme toggle (header + floating share same state)
      const syncThemeIcons = ()=>{
        const isDark = document.documentElement.classList.contains("dark");
        const h = document.getElementById("themeIconHeader");
        const f = document.getElementById("themeIcon");
        if(h) h.textContent = isDark ? "🌙" : "☀️";
        if(f) f.textContent = isDark ? "🌙" : "☀️";
      };
      on("themeToggleHeader","click", ()=>{
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        syncThemeIcons();
      });
      // sync once after bind
      setTimeout(syncThemeIcons, 0);
      // admin save API URL
      on("saveApiUrlBtn","click", ()=>{
        if(!app.isAdmin){ return; }
        const v = (document.getElementById("modelApiUrlInput").value || "").trim();
        if(!v){ alert(app.lang==="th" ? "กรุณาใส่ URL" : "Please enter URL"); return; }
        app.modelApiUrl = v;
        app.prefs.modelApiUrl = v;
        app.savePrefs();
        alert(app.lang==="th" ? "บันทึกแล้ว" : "Saved");
      });
      // scan upload
      const uploadArea = document.getElementById("uploadArea");
      const fileInput = document.getElementById("fileInput");
      const preview = document.getElementById("preview");
      const previewImage = document.getElementById("previewImage");
      const predictBtn = document.getElementById("predictBtn");
      const resultBox = document.getElementById("resultBox");
      const predLabel = document.getElementById("predLabel");
      const predConf = document.getElementById("predConf");
      const altList = document.getElementById("altList");
      uploadArea.addEventListener("click", ()=> fileInput.click());
      uploadArea.addEventListener("dragover", (e)=>{ e.preventDefault(); uploadArea.classList.add("ring-2","ring-emerald-400"); });
      uploadArea.addEventListener("dragleave", ()=> uploadArea.classList.remove("ring-2","ring-emerald-400"));
      uploadArea.addEventListener("drop", (e)=>{
        e.preventDefault();
        uploadArea.classList.remove("ring-2","ring-emerald-400");
        const f = e.dataTransfer.files?.[0];
        if(f) handleFile(f);
      });
      fileInput.addEventListener("change", (e)=>{
        const f = e.target.files?.[0];
        if(f) handleFile(f);
      });
      function handleFile(f){
        if(!f.type?.startsWith("image/")){
          softError("[SCAN] Not image", f);
          return;
        }
        scanFile = f;
        const r = new FileReader();
        r.onload = (ev)=>{
          previewImage.src = String(ev.target.result || "");
          preview.classList.remove("hidden");
        };
        r.readAsDataURL(scanFile);
        predictBtn.disabled = false;
        resultBox.classList.add("hidden");
      }
      // camera
      const openCamBtn = document.getElementById("openCamBtn");
      const snapBtn = document.getElementById("snapBtn");
      if(openCamBtn) openCamBtn.addEventListener("click", startCamera);
      if(snapBtn) snapBtn.addEventListener("click", async ()=>{
        const f = await snapPhotoToFile();
        if(!f) return;
        scanFile = f;
        predictBtn.disabled = false;
        resultBox.classList.add("hidden");
        stopCamera();
      });
      // stop camera when leaving scan
      document.querySelectorAll(".nav-link").forEach(btn=>{
        btn.addEventListener("click", ()=>{
          if(btn.getAttribute("data-route")!=="scan") stopCamera();
        });
      });
      // predict
      predictBtn.addEventListener("click", async ()=>{
        if(!scanFile) return;
        const old = predictBtn.textContent;
        predictBtn.disabled = true;
        predictBtn.textContent = app.lang==="th" ? "กำลังจำแนก..." : "Classifying...";
        try{
          const pred = await classifyImage(scanFile);
          app.lastScan = pred;
          resultBox.classList.remove("hidden");
          predLabel.textContent = pred.label || "-";
          const scanVegInfo=document.getElementById("scanVegInfo");
          if(scanVegInfo){
            const veg = pred.veg || null;
            if(veg){
              const name = (app.lang==="th") ? veg.thai_name : veg.en_name;
              scanVegInfo.innerHTML = `
                <div class="font-black text-emerald-700 dark:text-emerald-300">${escapeHtml(name || "-")}</div>
                <div class="text-sm text-slate-500 dark:text-slate-400 italic">${escapeHtml(veg.scientific_name || "")}</div>
                <div class="text-sm md:text-base"><b>${app.lang==="th"?"โภชนาการ: ":"Nutrition: "}</b>${escapeHtml(veg.nutrition || "-")}</div>
                <div class="text-sm md:text-base"><b>${app.lang==="th"?"วิธีการปรุง: ":"Cooking: "}</b>${escapeHtml(veg.cooking || "-")}</div>
              `;
            }else{
              scanVegInfo.innerHTML = `<div class="text-sm text-slate-500 dark:text-slate-400">${app.lang==="th"?"ไม่พบข้อมูลโภชนาการ/การปรุงสำหรับผลลัพธ์นี้":"No nutrition/cooking data for this result"}</div>`;
            }
          }
        }catch(err){
          softError("[SCAN] classify failed", err);
          alert(t(app.lang,"modelUnavailable"));
        }finally{
          predictBtn.disabled = false;
          predictBtn.textContent = old;
        }
      });
      on("scanSeeDetail","click", ()=>{
        const k = app.lastScan?.classKey;
        if(k) app.openVegDetail(k);
      });
      on("scanGoMap","click", ()=> app.route("map"));
      // Admin toggle by long-press logo (5s): must be admin session from email+password
      const logo = document.getElementById("logoPress");
      let pressTimer = null;
      if(logo){
        const start = () => {
          pressTimer = setTimeout(()=>{
            window.location.href = "/admin";
          }, CONFIG.ADMIN_LONGPRESS_MS);
        };
        const cancel = () => { if(pressTimer) clearTimeout(pressTimer); pressTimer=null; };
        logo.addEventListener("mousedown", start);
        logo.addEventListener("touchstart", start, {passive:true});
        logo.addEventListener("mouseup", cancel);
        logo.addEventListener("mouseleave", cancel);
        logo.addEventListener("touchend", cancel);
        logo.addEventListener("touchcancel", cancel);
      }
    }
    /***********************
     * BOOT
     ***********************/
    async function boot(){
      try{
      app.prefs = loadPrefs();
      app.lang = app.prefs.lang || CONFIG.DEFAULT_LANG;
      app.modelApiUrl = CONFIG.MODEL_API_URL; // always same-origin
      // (ignore saved prefs to avoid broken localhost URLs on other devices)
      // theme selection removed

  // Load local session first (guest by default)
      app.session = loadSession();
      if(!app.session){
        app.session = { id: uuid("guest"), provider:"guest", name:"Guest", email:"", role:"guest", hasPasswordLogin:false };
        saveSession(app.session);
      }

      // Sync session from server (Google OAuth / Email login) and overwrite local if logged in
      try{
        const meRes = await fetch('/api/me', { credentials:'include' });
        if(meRes.ok){
          const me = await meRes.json();
          if(me && me.logged_in && me.user){
            app.session = me.user;
            saveSession(app.session);
          }
        }
      }catch(e){}

      if(!app.session){
        app.session = { id: uuid("guest"), provider:"guest", name:"Guest", email:"", role:"guest", hasPasswordLogin:false };
        saveSession(app.session);
      }
      app.markers = loadMarkers();
      app.applyI18n();
      bindUI();
      /* initMap is lazy now (to avoid breaking app when Leaflet fails to load) */
      // restore admin panel only if session is admin + password login
      const panelFlag = localStorage.getItem(KEYS.adminPanel) === "1";
      if(panelFlag && app.session.role==="admin" && app.session.hasPasswordLogin && isAdminEmail(app.session.email)){
        app.setAdminPanel(true);
      }else{
        app.setAdminPanel(false);
      }
      // sync admin api url field
      document.getElementById("modelApiUrlInput").value = app.modelApiUrl;
      // veg list + reviews
      renderVegList();
      renderReviewsLists();
      // header info
      app.updateHeaderUI();
      // profile fields (if not guest)
      hydrateProfile();
      // default route: home
      app.route("home");
      } catch(e){ console.error("[BOOT]", e); }
    }
    function hydrateProfile(){
      const nameEl = document.getElementById("profileName");
      const emailEl = document.getElementById("profileEmail");
      const roleText = document.getElementById("roleText");
      if(app.isGuest){
        nameEl.value = "";
        emailEl.value = "";
        roleText.textContent = t(app.lang,"guestLimited");
        return;
      }
      nameEl.value = app.session.name || "";
      emailEl.value = app.session.email || "";
      roleText.textContent = app.isAdmin ? t(app.lang,"adminRole") : t(app.lang,"userRole");
      const rp=document.getElementById("rolePill"); if(rp) rp.textContent = (app.session.role||"user").toUpperCase();
    }
    // keep profile updated when route to profile
    const _oldRoute = app.route.bind(app);
    app.route = (r)=>{
      _oldRoute(r);
      if(r==="profile") hydrateProfile();
    };
    try{ boot(); }catch(e){ console.error("[BOOT]",e); }
  </script>

{% if gmaps_key %}
<!-- Load Google Maps (needs billing+enabled Maps JavaScript API) -->
<script src="https://maps.googleapis.com/maps/api/js?key={{ gmaps_key|e }}&v=weekly&loading=async&libraries=places,marker&callback=initMap" async defer></script>
{% endif %}

<!-- Floating Theme Button -->
<button id="themeToggleFloating"
  type="button"
  class="fixed bottom-6 right-6 z-[999]
         w-14 h-14 rounded-full
         bg-slate-900 dark:bg-white
         text-white dark:text-slate-900
         shadow-lg hover:scale-110
         transition-all duration-300
         flex items-center justify-center">
  <span id="themeIcon">🌙</span>
</button>

<script>
(function(){
  const btn = document.getElementById("themeToggleFloating");
  const icon = document.getElementById("themeIcon");

  function syncIcon(){
    const isDark = document.documentElement.classList.contains("dark");
    icon.textContent = isDark ? "🌙" : "☀️";
    const h = document.getElementById("themeIconHeader");
    if(h) h.textContent = isDark ? "🌙" : "☀️";
  }

  // initial icon
  syncIcon();

  btn.addEventListener("click", ()=>{
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark":"light");
    syncIcon();
  });
})();
</script>

</body>
</html>
