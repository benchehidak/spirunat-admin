const formClasses =
  'block w-full appearance-none rounded-lg border  py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-white placeholder:text-gray-400 focus:border-stone-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'

const Label = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className='mb-2 block text-sm font-semibold '
      style={{color: '#dfd2f0'}}
    >
      {children}
    </label>
  )
}

const TextField = ({ id, label, type = 'text', className, ...props }) => {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} style={{backgroundColor: 'transparent'}} className={formClasses} />
    </div>
  )
}

export default TextField
