import { CirclePlay } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { cn } from '@/lib/utils'
import { SidebarLink } from './SidebarLink'

type Id = string | number

type CourseSection = {
  id: Id
  section_index: Id
  title: string
}

type CourseLesson = {
  id: Id
  section_id: Id
  title: string
}

type CourseSidebarAccordionProps = {
  sections: CourseSection[]
  lessons: CourseLesson[]
  courseSlug: string
  selectedLessonId?: Id
  className?: string
}

export function CourseSidebarAccordion({
  sections,
  lessons,
  courseSlug,
  selectedLessonId,
  className,
}: CourseSidebarAccordionProps) {
  const selectedLesson = lessons.find((lesson) => lesson.id === selectedLessonId)

  // const defaultOpenSections = selectedLesson
  //   ? [`section-${selectedLesson.section_id}`]
  //   : sections.map((section) => `section-${section.id}`)

  const defaultOpenSections = sections.map(
    (section) => `section-${section.id}`
  )

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpenSections}
      className={cn(className, 'border-0')}
    >
      {sections.map((section) => {
        const sectionLessons = lessons.filter(
          (lesson) => lesson.section_id === section.id
        )

        return (
          <AccordionItem key={section.id} value={`section-${section.id}`} className='border-r-0 border-l-0 first:border-t-0'>
            <AccordionTrigger className="text-left text-sm text-accent-foreground">
              <span>
                {section.title}
              </span>
            </AccordionTrigger>

            <AccordionContent className="space-y-1 p-2 first:pt-0 px-0 m-0">
              {sectionLessons.map((lesson) => {
                const isSelected = selectedLessonId === lesson.id

                return (
                  <SidebarLink
                    key={lesson.id}
                    href={`/courses/${courseSlug}?lesson=${lesson.id}`}
                    className={cn(
                      'gap-2 p-3 m-0',
                      isSelected
                        ? 'bg-primary text-primary-foreground hover:bg-primary'
                        : 'bg-background'
                    )}
                    trailingIcon={<CirclePlay className="h-5 w-5" />}
                  >
                    {lesson.title}
                  </SidebarLink>
                )
              })}
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}