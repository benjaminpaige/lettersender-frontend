import { IoCalendar, IoGrid, IoHelpBuoy } from "react-icons/io5"
import { MdWeb } from "react-icons/md"
import { µNavBar } from "./types"

export namespace çNavBar {
  export const links: µNavBar.Link[] = [
    { label: "Messages", href: "/dashboard/messages" },
    { label: "For Teams", href: "#" },
    {
      label: "Resources",
      children: [
        {
          label: "Get Help",
          description: "Read our documentation and FAQs, or get in touch.",
          href: "#",
          Icon: IoHelpBuoy
        },
        {
          label: "Events & Meetups",
          description: "Discover and join your local Sketch community.",
          href: "#",
          Icon: IoCalendar
        },
        {
          label: "Extensions",
          description:
            "Do even more with Assistants, plugins and integrations.",
          href: "#",
          Icon: IoGrid
        },
        {
          label: "Blog",
          description: "Get updates, articles and insights from the team.",
          href: "#",
          Icon: MdWeb
        }
      ]
    },
    { label: "Pricing", href: "#" }
  ]
}
