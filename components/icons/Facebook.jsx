export default function Facebook({ ...props }) {
  const { color, width, height } = props;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || "7.406"}
        height={height || "15.375"}
        viewBox="0 0 7.406 15.375"
      >
        <path
          id="Path_51"
          data-name="Path 51"
          d="M32.32,28.066h1.571V26.526a3.988,3.988,0,0,1,.512-2.382,2.826,2.826,0,0,1,2.476-1.157,9.979,9.979,0,0,1,2.847.286l-.4,2.352a5.352,5.352,0,0,0-1.28-.192c-.619,0-1.17.222-1.17.854v1.78h2.535l-.175,2.3h-2.36v7.986H33.891V30.367H32.32Z"
          transform="translate(-32.32 -22.978)"
          fill={color || "#fff"}
        />
      </svg>
    </>
  );
}
