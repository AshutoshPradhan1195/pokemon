export const PulsingDetails = () => {
  return (
    <>
      <div className="w-full mt-10 mb-10">
        <div className="w-full flex flex-row skeleton rounded-4xl ">
          <div style={{ width: 300, height: 300 }}></div>
        </div>
      </div>
      <div className="w-full  flex flex-row skeleton rounded-4xl ">
        <div style={{ width: 300, height: 300 }}></div>
      </div>
    </>
  );
};
