import clsx from 'clsx';

function generateAvatar({
  text = 'AB',
  isRound = true,
  size = 60,
  color = '#ffffff',
  fontSize = 0.4,
}) {
  const sizeStyle = { width: size, height: size }
  const textStyle = { color, lineHeight: 1, fontFamily: "-apple-system, BlinkMacSystemFont, 'Roboto', 'Ubuntu', 'Helvetica Neue', sans-serif" }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="dark:fill-white fill-gray-500" style={sizeStyle} viewBox={`0 0 ${size} ${size}`} version="1.1" >
      {isRound ?
        <circle style={sizeStyle} cx={size / 2} cy={size / 2} r={size / 2} /> :
        <rect style={sizeStyle} cx={size / 2} cy={size / 2} r={size / 2} rx={size / 6} ry={size / 6} />}

      <text x="50%" y="50%" style={textStyle}
        alignmentBaseline="middle" textAnchor="middle" fontSize={Math.round(size * fontSize)} fontWeight="normal"
        dy=".1em" dominantBaseline="middle" className="dark:fill-black fill-white" >
        {text}
      </text>
    </svg>
  )
}

const variants = {
  round: 'rounded-full',
  square: 'rounded',
};

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-14 w-14',
  lg: 'h-20 w-20',
  xl: 'h-30 w-30',
};

const pxSizes = {
  sm: 38,
  md: 44,
  lg: 50,
  xl: 56,
};

type SrcType =
  | { src: string; alt?: string }
  | { src?: string; alt: string; }

type Props = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
} & SrcType;

export const Avatar = ({
  variant = 'round',
  size = 'md',
  src,
  alt
}: Props) => {
  if (!src) {
    const text = alt?.split(' ').reduce((a, k) => a + k[0], '').slice(0, 2).toUpperCase()
    return <>{generateAvatar({ text, isRound: variant === 'round', size: pxSizes[size] })}</>
  }

  return (
    <>
      <img src={src} alt={alt} className={clsx(
        'inline-block border-2 border-gray-100 ',
        variants[variant],
        sizes[size],
      )} />
    </>
  )
};

