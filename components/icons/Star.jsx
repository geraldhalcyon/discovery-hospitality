export default function Star({ ...props }) {
  const { color, width, height, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "34.585"}
      height={height || "32.981"}
      viewBox="0 0 34.585 32.981"
      className={className}
    >
      <g id="star_bold" transform="translate(0)">
        <path
          id="Path_193"
          data-name="Path 193"
          d="M18.11,1l4.4,10.412,11.262.968a.888.888,0,0,1,.506,1.555l-8.543,7.4,2.56,11.01a.887.887,0,0,1-1.323.96l-9.679-5.837L7.614,33.3a.887.887,0,0,1-1.323-.96l2.56-11.01-8.544-7.4a.888.888,0,0,1,.506-1.555l11.262-.968L16.475,1A.887.887,0,0,1,18.11,1Z"
          transform="translate(0 -0.452)"
          fill={color || "#fff"}
        />
      </g>
    </svg>
  );
}
