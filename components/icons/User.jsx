export default function User({ ...props }) {
  const { width, height, color, className } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "13.449"}
      height={height || "16"}
      viewBox="0 0 13.449 16"
      className={className || ""}
    >
      <g id="_001-user" data-name="001-user" transform="translate(-20.625)">
        <circle
          id="Ellipse_113"
          data-name="Ellipse 113"
          cx="3.71"
          cy="3.71"
          r="3.71"
          transform="translate(23.639)"
          fill={color || "#555"}
        />
        <path
          id="Path_98"
          data-name="Path 98"
          d="M27.35,150a6.725,6.725,0,0,0-6.725,6.725H34.074A6.725,6.725,0,0,0,27.35,150Z"
          transform="translate(0 -140.725)"
          fill={color || "#555"}
        />
      </g>
    </svg>
  );
}
