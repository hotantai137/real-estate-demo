"use client";

import dynamic from "next/dynamic";

const VietnamMap = dynamic(() => import("@/components/vietnam-map"), {
  loading: () => <p>Đang tải bản đồ...</p>,
  ssr: false, // Tắt SSR để tránh lỗi window is not defined
});

const MapWrapper = () => {
  return (
    <div className="w-full h-screen">
      <VietnamMap />
    </div>
  );
};

export default MapWrapper;