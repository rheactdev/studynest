import Link from 'next/link'
import { cn } from '@/lib/utils'
import { sidebarItemVariants, useSidebar } from '@/components/ui/sidebar'
import SidebarCheckbox from './SidebarCheckbox'
import { AttachmentRecord } from '@/lib/server/types'
import { Button } from './ui/button'
import { PaperclipIcon } from 'lucide-react'

type SidebarLinkProps = React.ComponentProps<typeof Link> & {
  icon?: React.ReactNode
  trailingIcon?: React.ReactNode
  variant?: 'default' | 'active'
  className?: string
  children: React.ReactNode
}

export function SidebarLink({
  href,
  icon,
  trailingIcon,
  variant = 'default',
  className,
  children,
  ...props
}: SidebarLinkProps) {
  // const { state } = useSidebar()
  const isCollapsed = false

  return (
    <Link
      href={href}
      className={cn(
        sidebarItemVariants({ variant }),
        'w-full',
        isCollapsed && 'justify-center px-2',
        className,
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}

      {!isCollapsed && (
        <div className="flex gap-6 items-center">
          {trailingIcon && <span className="ml-auto shrink-0">{trailingIcon}</span>}
          <span className="min-w-0">{children}</span>
        </div>
      )}
    </Link>
  )
}

type LessonRowProps = {
  href: string
  title: string
  isSelected: boolean
  isCompleted: boolean
  attachments?: AttachmentRecord[]
}

export const SidebarRowLink = ({
  href,
  title,
  isSelected,
  isCompleted,
  attachments,
}: LessonRowProps) => {
  // const { state } = useSidebar()
  // if (state === 'collapsed') return
  // console.log(attachments?.length)
  return (
    <li className="border-b-2 border-muted last:border-b-0 flex hover:bg-muted/50">
      <Link href={href} className="">
        <div className="flex px-4 shrink-0 items-center justify-center border-r border-muted py-4">
          <SidebarCheckbox isSelected={isSelected} isCompleted={isCompleted} />
        </div>
        <div className="flex min-w-0 flex-1 items-center px-4 py-4">
          <span className="line-clamp-2">{title}</span>
        </div>
        {attachments?.length ? (
          <div className="flex px-4 shrink-0 items-center justify-center border-l border-muted py-4">
            <Button size="sm">
              <PaperclipIcon />
            </Button>
          </div>
        ) : null}
      </Link>
    </li>
  )
}
