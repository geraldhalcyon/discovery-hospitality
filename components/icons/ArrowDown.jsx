export default function ArrowDown({ ...props }) {
  const { width, height, color, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "17.543"}
      height={height || "10"}
      viewBox="0 0 17.543 10"
      className={className || ""}
    >
      <g id="arrow-down-sign-to-navigate" transform="translate(-0.001 -97.141)">
        <path
          id="Path_200"
          data-name="Path 200"
          d="M8.772,107.141a1.225,1.225,0,0,1-.868-.36L.361,99.238A1.229,1.229,0,0,1,2.1,97.5l6.674,6.675L15.446,97.5a1.228,1.228,0,0,1,1.737,1.737l-7.543,7.543A1.225,1.225,0,0,1,8.772,107.141Z"
          fill={color || "#555"}
          className="fill-current"
        />
      </g>
    </svg>
  );
}
