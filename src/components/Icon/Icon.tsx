import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg'
import { ReactComponent as IconClear } from '../../assets/svg/icon-clear.svg'

type Props = {
  name: string
  className?: string
}

export const Icon = ({ name, className = '' }: Props) => {
  if (name === 'clear') {
    return <IconClear className={className} />
  }
  if (name === 'search') {
    return <IconSearch className={className} />
  }
  return <></>
}
