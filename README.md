# Course Player

A local-first course video player built with Next.js, SQLite, and a bold, compact UI. It scans a folder of downloaded courses, indexes sections, lessons, captions, attachments, and watch progress, then serves everything through stable ID-based routes.

## Features

- Local course library scanning into SQLite
- Section and lesson navigation
- HTML video playback with range requests
- Resume position and completion tracking
- Completed lessons shown with a success background and checkmark
- Matching `.vtt` subtitle support, including language sidecars like `intro.en.vtt`
- Lesson attachments matched from section folders or course-level attachment folders
- Course covers and metadata support

## Getting Started

Install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

The app reads courses and stores its database using these environment variables:

```sh
COURSES_DIR=./courses
DATA_DIR=./data
DATABASE_PATH=./data/course-player.sqlite
```

Defaults are shown above. You can put these in `.env.local`.

## Course Folder Shape

Courses are discovered under an instructor folder:

```txt
courses/
  Instructor Name/
    Course Folder Name/
      metadata.json
      cover.jpg
      00. Introduction/
        01. Welcome.mp4
        01. Welcome.en.vtt
      01. The Basics/
        01. Creating a doodle page.mp4
        02. Finding and exploring tools.mp4
      Attachments/
        1-1grimbrush.abr
        1-1grimbcolorswatch.aco
        2-1character.psd
```

Section folders use a numeric prefix:

```txt
00. Introduction
01. The Basics
02. Creating Your Character
```

Lesson videos use a numeric prefix and one of these extensions:

```txt
01. Lesson Title.mp4
02. Lesson Title.mkv
03. Lesson Title.webm
```

Supported video extensions are `mp4`, `mkv`, `webm`, `mov`, and `m4v`.

## Captions

Captions are matched beside the lesson video by filename:

```txt
01. Welcome.mp4
01. Welcome.vtt
01. Welcome.en.vtt
```

If multiple sidecar `.vtt` files exist, English sidecars such as `.en.vtt` are preferred.

## Attachments

Course-level attachments use a `section-lesson` prefix. For example:

```txt
Attachments/
  1-1grimbrush.abr
```

This attaches to section `01`, lesson `01`.

The scanner also supports section-local attachments:

```txt
01. The Basics/
  Attachments/
    01. Brush.abr
    01/
      Extra File.zip
```

## Scanning

Start the app, then scan the course library:

```sh
curl -X POST http://localhost:3000/api/scan
```

After scanning, visit `/courses` and open a course.

## Progress Tracking

Progress is stored in SQLite. The browser sends the current playback position and duration to the server:

- every few seconds during playback
- on pause
- after seeking
- when the tab is hidden
- when the page exits
- when the video ends

Lessons are marked complete when playback reaches 90% or the video ends.

## Scripts

```sh
pnpm dev      # Start development server
pnpm build    # Build production app
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Tech Stack

- Next.js 16
- React 19
- SQLite via `node:sqlite`
- Tailwind CSS
- Radix UI primitives
- Lucide icons
- BoldKit-inspired UI styling

## Special Thanks

Special thanks to the BoldKit creator for making a beautiful UI and for being very helpful with issues.
