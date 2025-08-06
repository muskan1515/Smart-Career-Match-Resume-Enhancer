type ProgressProps = {
  value: number ,
  className: string
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
      <div
        className="bg-green-500 h-3 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}
