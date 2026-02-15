import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm">
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
          🌿 LannaVeg
        </h1>

        <div className="flex gap-6 text-gray-700 dark:text-gray-300 font-medium">
          <Link href="/classify" className="hover:text-green-600 transition">Classify</Link>
          <Link href="/map" className="hover:text-green-600 transition">Map</Link>
          <Link href="/login" className="hover:text-green-600 transition">Login</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h2 className="text-5xl md:text-6xl font-extrabold text-green-800 dark:text-green-300 leading-tight">
          ระบบจำแนกผักพื้นเมืองล้านนา
        </h2>

        <p className="mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          อัปโหลดรูปภาพเพื่อให้ AI วิเคราะห์ชนิดของผักพื้นเมืองภาคเหนือ
          พร้อมข้อมูลโภชนาการและแหล่งที่มา
        </p>

        <div className="mt-10 flex flex-wrap gap-6 justify-center">

          <Link href="/upload">
            <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl shadow-lg transition-all duration-300">
              🔍 เริ่มจำแนกผัก
            </button>
          </Link>

          <Link href="/map">
            <button className="px-8 py-4 bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 border border-green-500 text-lg font-semibold rounded-xl shadow hover:shadow-lg transition-all duration-300">
              🗺️ ดูแผนที่ผักพื้นเมือง
            </button>
          </Link>

        </div>

      </section>

      {/* FEATURE SECTION */}
      <section className="px-8 pb-24 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        <FeatureCard
          icon="🤖"
          title="AI Accuracy"
          description="ใช้โมเดล Deep Learning วิเคราะห์ภาพผักอย่างแม่นยำ"
        />

        <FeatureCard
          icon="📍"
          title="Google Maps Integration"
          description="แสดงตำแหน่งแหล่งผักพื้นเมืองใกล้คุณ"
        />

        <FeatureCard
          icon="📊"
          title="Nutrition Information"
          description="ดูข้อมูลคุณค่าทางโภชนาการของผักแต่ละชนิด"
        />

      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} LannaVeg Project | University of Phayao
      </footer>

    </div>
  );
}


function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow hover:shadow-xl transition duration-300 text-center">
      <div className="text-5xl">{icon}</div>
      <h3 className="mt-4 text-xl font-semibold text-green-700 dark:text-green-400">
        {title}
      </h3>
      <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
        {description}
      </p>
    </div>
  );
}
