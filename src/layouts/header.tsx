import {
  createElement,
  FC,
  ReactNode,
  Fragment,
  useRef,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { Popover, Transition } from "@headlessui/react";
import logo from "../../public/logo.svg";
import {
  RiQuestionLine,
  RiTimeLine,
  RiUser3Line,
  RiComputerLine,
  RiFilePaperLine,
  RiRewindLine,
  RiLightbulbLine,
  RiQuestionnaireLine,
  RiGithubFill,
  RiDiscordFill,
  RiSunLine,
  RiMoonLine,
  RiCloseLine,
  RiMenuLine,
  RiArrowDownSLine,
  RiInformationLine,
  RiEdit2Line,
} from "react-icons/ri";
import type { IconType } from "react-icons/lib";
import Link from "next/link";
import { useTheme } from "next-themes";

const recentPosts = [
  { id: 1, name: "Article 1", href: "#" },
  {
    id: 2,
    name: "Article 2",
    href: "#",
  },
  { id: 3, name: "Article 3", href: "#" },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const blogs = [
  {
    name: "Personal Blog",
    description: "My personal blog, which details my day-to-day life.",
    href: "/blog/personal",
    icon: RiUser3Line,
  },
  {
    name: "Website Blog",
    description:
      "A blog about my website, how it's maintained, any new updates, and more!",
    href: "/blog/website",
    icon: RiComputerLine,
  },
  {
    name: "Projects",
    description:
      "Here's work detailing some projects I'm in, and the work I put in to make them successful.",
    href: "/blog/projects",
    icon: RiFilePaperLine,
  },
];

const PopoverHeader: FC<{ title: string; open: boolean }> = ({
  children,
  title,
  open,
}) => (
  <div>
    <Popover.Button
      className={classNames(
        open
          ? "text-gray-900 dark:text-gray-50"
          : "text-gray-500 dark:text-gray-300",
        "group dark:hover:text-gray-100 rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-indigo-500 focus:ring-offset-gray-800"
      )}
    >
      <span>{title}</span>
      <RiArrowDownSLine
        className={classNames(
          open
            ? "text-gray-600 dark:text-gray-50"
            : "text-gray-400 dark:text-gray-300",
          "ml-2 h-5 w-5 group-hover:text-gray-500 dark:group-hover:text-gray-100"
        )}
        aria-hidden="true"
      />
    </Popover.Button>

    <Transition
      show={open}
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel
        static
        className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
      >
        {children}
      </Popover.Panel>
    </Transition>
  </div>
);

const MenuLink: FC<{ name: string; href: string; icon: IconType }> = ({
  name,
  href,
  icon,
}) => (
  <Link href={href} passHref>
    <span className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
      {createElement(icon, {
        className: "flex-shrink-0 h-6 w-6 text-indigo-600",
        "aria-hidden": "true",
      })}
      <span className="ml-3 text-base font-medium text-gray-900 dark:text-gray-50">
        {name}
      </span>
    </span>
  </Link>
);

const Header: FC<{}> = () => {
  const hideAllRef = useRef<HTMLButtonElement>(null);

  const MenuDescription: FC<{
    name: string;
    href: string;
    description: string;
    icon: IconType;
  }> = ({ name, href, description, icon }) => (
    <Link href={href} passHref>
      <span
        className="-m-3 p-3 flex items-start rounded-lg dark:hover:bg-gray-800 hover:bg-gray-50 cursor-pointer"
        onClick={() => hideAllRef?.current?.click()}
      >
        {createElement(icon, {
          className: "flex-shrink-0 h-6 w-6 text-indigo-600 mt-1",
          "aria-hidden": "true",
        })}
        <div className="ml-4">
          <p className="text-base font-medium dark:text-gray-50 text-gray-900">
            {name}
          </p>
          <p className="mt-1 text-sm dark:text-gray-300 text-gray-500">
            {description}
          </p>
        </div>
      </span>
    </Link>
  );

  const [mounted, setMounted] = useState<boolean>(false);
  let { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    theme = "light";
    setTheme = () => {};
  }

  return (
    <>
      <Popover className="relative bg-gray-200 dark:bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex justify-between items-center border-b-2 border-gray-800 dark:border-gray-100 py-6 md:justify-start lg:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                  <span className="sr-only">Logo</span>
                  <Link href="/" passHref>
                    <div className="h-10 w-10 sm:h-12 sm:w-12 relative cursor-pointer">
                      <Image
                        src={logo}
                        alt=""
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </Link>
                </div>
                <Popover.Group
                  as="nav"
                  className="hidden md:flex space-x-6 lg:space-x-10"
                >
                  <Popover className="hidden relative">
                    {() => <Popover.Button ref={hideAllRef} />}
                  </Popover>
                  <Popover className="relative">
                    {({ open }) => (
                      <PopoverHeader title="Blog" open={open}>
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 dark:bg-gray-900 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            {blogs.map((el) => (
                              <MenuDescription key={el.name} {...el} />
                            ))}
                          </div>
                          <div className="px-5 py-5 bg-gray-50 dark:bg-gray-700 sm:px-8 sm:pt-8 sm:pb-4">
                            <div>
                              <h3 className="text-sm tracking-wide font-medium dark:text-gray-300 text-gray-500 uppercase">
                                Recent Posts
                              </h3>
                              <ul className="mt-4 space-y-4">
                                {recentPosts.map((post) => (
                                  <li
                                    key={post.id}
                                    className="text-base truncate"
                                  >
                                    <a
                                      href={post.href}
                                      className="font-medium dark:text-gray-50 dark:hover:text-gray-200 text-gray-900 hover:text-gray-700"
                                    >
                                      {post.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="mt-5 text-sm">
                              <a
                                href="#"
                                className="font-medium text-indigo-600 dark:text-indigo-200 dark:hover:text-indigo-300 hover:text-indigo-500"
                              >
                                {" "}
                                View all posts{" "}
                                <span aria-hidden="true">&rarr;</span>
                              </a>
                            </div>
                          </div>
                          <div className="px-5 py-5 bg-gray-50 dark:bg-gray-800 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8 text-base font-medium dark:text-gray-50 text-gray-900">
                            <div className="flow-root">
                              <a
                                href="#"
                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <RiQuestionLine
                                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-3">Random Article</span>
                              </a>
                            </div>
                            <div className="flow-root">
                              <a
                                href="#"
                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <RiTimeLine
                                  className="flex-shrink-0 h-6 w-6 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="ml-3">Latest Article</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </PopoverHeader>
                    )}
                  </Popover>

                  <a
                    href="#"
                    className="text-base dark:hover:text-gray-50 dark:text-gray-300 font-medium text-gray-500 hover:text-gray-900"
                  >
                    About Me
                  </a>
                  <Popover className="relative">
                    {({ open }) => (
                      <PopoverHeader title="QoTD" open={open}>
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 dark:bg-gray-900 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            <MenuDescription
                              name="Today's QoTD"
                              description="See what question I'm interested in today!"
                              href="/qotd"
                              icon={RiTimeLine}
                            />
                            <MenuDescription
                              name="Past QoTD"
                              description="View questions I've posed in the past."
                              href="/qotd/past"
                              icon={RiRewindLine}
                            />
                            <MenuDescription
                              name="Suggest a QoTD"
                              description="Do you have a question that has an interesting answer? WHy not share it!"
                              href="/qotd/suggest"
                              icon={RiLightbulbLine}
                            />
                          </div>
                        </div>
                      </PopoverHeader>
                    )}
                  </Popover>

                  <Popover className="relative">
                    {({ open }) => (
                      <PopoverHeader title="PoTD" open={open}>
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                          <div className="relative grid gap-6 dark:bg-gray-900 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                            <MenuDescription
                              name="Today's PoTD"
                              description="Attempt today's problems of the day!"
                              href="/potd"
                              icon={RiTimeLine}
                            />
                            <MenuDescription
                              name="Past PoTD"
                              description="View a past PoTD and my solution (if available)."
                              href="/potd/past"
                              icon={RiRewindLine}
                            />
                            <MenuDescription
                              name="Suggest a PoTD"
                              description="Suggest a PoTD (that fits the two levels) to include. Can not be a past PoTD."
                              href="/potd/suggest"
                              icon={RiLightbulbLine}
                            />
                            <MenuDescription
                              name="Submit an Answer"
                              description="Submit an answer to the current PoTD (if applicable)."
                              href="/potd/answer"
                              icon={RiQuestionnaireLine}
                            />
                          </div>
                        </div>
                      </PopoverHeader>
                    )}
                  </Popover>
                </Popover.Group>
                <div className="flex items-center justify-end flex-1">
                  <Link href="https://www.github.com/AmoleR/blog" passHref>
                    <span>
                      <RiGithubFill
                        className="flex-shrink-0 h-8 w-8 mx-3 cursor-pointer text-gray-900 dark:text-gray-50"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                  <Link href="https://discord.gg/3MNWwzhxZX" passHref>
                    <span>
                      <RiDiscordFill
                        className="flex-shrink-0 h-8 w-8 mx-3 cursor-pointer text-gray-900 dark:text-gray-50"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                  {theme === "light" ? (
                    <RiMoonLine
                      className="flex-shrink-0 h-6 w-6 mx-3 cursor-pointer text-gray-900 dark:text-gray-50"
                      aria-hidden="true"
                      onClick={() => setTheme("dark")}
                    />
                  ) : (
                    <RiSunLine
                      className="flex-shrink-0 h-6 w-6 mx-3 cursor-pointer text-gray-900 dark:text-gray-50"
                      aria-hidden="true"
                      onClick={() => setTheme("light")}
                    />
                  )}
                </div>

                <a
                  href="#"
                  className="hidden justify-end md:flex ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Log In
                </a>

                <div className="md:hidden">
                  <Popover.Button className="dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:text-gray-300 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">
                      {open ? "Close menu" : "Open menu"}
                    </span>
                    {open ? (
                      <RiCloseLine className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <RiMenuLine className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel
                      static
                      className="absolute top-18 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-10 dark:bg-gray-900 bg-gray-50">
                        <div className="pt-5 px-5">
                          <div className="py-6 px-5 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                              {blogs.map((el) => (
                                <MenuLink {...el} key={el.name} />
                              ))}
                              <MenuLink
                                name="About Me"
                                icon={RiInformationLine}
                                href="/about-me"
                              />
                              <MenuLink
                                name="PoTD"
                                icon={RiEdit2Line}
                                href="/potd/all"
                              />
                              <MenuLink
                                name="QoTD"
                                icon={RiQuestionLine}
                                href="/qotd/all"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="pb-3 mx-4">
                          <a
                            href="#"
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                          >
                            Log In
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </div>
              </div>
            </div>
          </>
        )}
      </Popover>
    </>
  );
};

export const getLayout = (page: ReactNode) => (
  <>
    <Header />
    {page}
  </>
);

export default Header;
