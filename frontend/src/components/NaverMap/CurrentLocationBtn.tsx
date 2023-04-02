interface CurrentLocationBtnType {
  mapRef: React.RefObject<HTMLDivElement>;
  getCurrentLocation: () => void;
}

function CurrentLocationBtn({
  mapRef,
  getCurrentLocation,
}: CurrentLocationBtnType) {
  return (
    <div
      ref={mapRef}
      style={{
        width: "74vw",
        height: "100vh",
      }}
    >
      <button
        style={{
          position: "fixed",
          zIndex: 100,
          bottom: "14%",
          right: "0.8%",
        }}
        onClick={() => getCurrentLocation()}
      >
        +
      </button>
    </div>
  );
}

export default CurrentLocationBtn;
