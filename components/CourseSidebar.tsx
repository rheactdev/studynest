import {
    Sidebar, SidebarProvider, SidebarHeader, SidebarContent,
    SidebarItem, SidebarToggle, SidebarInset,
    SidebarGroup,
    SidebarGroupLabel
} from '@/components/ui/sidebar'
import { CirclePlay, Home, PlayCircleIcon, Settings } from 'lucide-react'

import type { AttachmentRecord, CourseRecord, LessonRecord, SectionRecord } from "@/lib/server/types";
import { SerializedAttachment, SerializedCourse, SerializedProgress } from '@/lib/server/serialize';
// import { useRouter } from 'next/navigation';
import { SidebarLink } from './SidebarLink';
import { Button } from './ui/button';
import { CourseSidebarAccordion } from './SidebarAccordianGroup';


interface CourseSidebarProps {
    courseName: string;
    course: SerializedCourse;
    sections: SectionRecord[];
    lessons: LessonRecord[];
    selectedLesson?: LessonRecord;
    children?: React.ReactNode;
}

export default function CourseSidebar({ courseName, sections, lessons, selectedLesson, course, children }: CourseSidebarProps) {

    // const router = useRouter();
    return (
        <SidebarProvider>

            <SidebarInset>
                {children}
            </SidebarInset>
            <Sidebar side="right" className=''>
                {/* <SidebarHeader>{courseName}</SidebarHeader> */}
                <SidebarContent className='p-0'>
                    <CourseSidebarAccordion sections={sections} lessons={lessons} courseSlug={course.slug} selectedLessonId={selectedLesson?.id}></CourseSidebarAccordion>
                    {/* {sections.map((section) => {
                        const sectionLessons = lessons.filter((lesson) => lesson.section_id === section.id);
                        return <SidebarGroup key={section.id}>
                            <SidebarGroupLabel>{section.section_index} {section.title}</SidebarGroupLabel>
                            {sectionLessons.map((lesson) => {
                                const isSelected = selectedLesson?.id === lesson.id;
                                const className = isSelected ? "bg-primary text-primary-foreground hover:bg-primary" : "bg-background";
                                return <span>
                                    <SidebarLink key={lesson.id} href={`/courses/${course?.slug}?lesson=${lesson.id}`} className={`gap-2 ${className}`} trailingIcon={<CirclePlay/>}>
                                        <span>{lesson.title}</span>
                                    </SidebarLink>
                                </span>
                            })}
                        </SidebarGroup>
                    })} */}
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    )
}