import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg'
import { ReactComponent as IconClear } from '../../assets/svg/icon-clear.svg'

export const Icon = ({ name = '', className = '' }) => {
  if (name === 'clear') {
    return <IconClear className={className} />
  }
  if (name === 'search') {
    return <IconSearch className={className} />
  }
}
