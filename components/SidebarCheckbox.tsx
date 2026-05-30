import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function SidebarCheckbox({
  isCompleted,
  isSelected,
}: {
  isCompleted: boolean
  isSelected: boolean
}) {
  return (
    <Checkbox
      disabled
      className="hover:translate-x-0 hover:translate-y-0 shadow-none disabled:opacity-100 pointer-events-none"
    />
  )
}
