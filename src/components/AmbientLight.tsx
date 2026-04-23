"use client";

export default function AmbientLight() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
    >
      {/* 左上: ポケモンレッド */}
      <div
        className="absolute"
        style={{
          top: "-80px", left: "-80px",
          width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, rgba(204,0,0,0.06) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      {/* 右上: ポケモンイエロー */}
      <div
        className="absolute"
        style={{
          top: "-60px", right: "-100px",
          width: "550px", height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 70% 30%, rgba(255,183,0,0.07) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      {/* 左下: ポケモンブルー */}
      <div
        className="absolute"
        style={{
          bottom: "-100px", left: "-60px",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 30% 70%, rgba(51,84,204,0.05) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
      {/* 右下: レッドサブ */}
      <div
        className="absolute"
        style={{
          bottom: "-80px", right: "-80px",
          width: "480px", height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 70% 70%, rgba(204,0,0,0.04) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
