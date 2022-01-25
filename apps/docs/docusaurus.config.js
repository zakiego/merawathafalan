// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Merawat Hafalan",
  tagline: "Menghafal sekali. Menjaganya sampai mati.",
  url: "https://docs.merawathafalan.my.id",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "zakiego", // Usually your GitHub org/user name.
  projectName: "merawathafalan", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),

          // Please change this to your repo.
          editUrl:
            "https://github.com/zakiego/merawathafalan/tree/main/apps/docs/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Merawat Hafalan",
        logo: {
          alt: "Merawat Hafalan Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Dokumentasi",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            href: "https://github.com/zakiego/merawathafalan",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        // links: [
        //   {
        //     title: "Docs",
        //     items: [
        //       {
        //         label: "Tutorial",
        //         to: "/docs/intro",
        //       },
        //     ],
        //   },
        //   {
        //     title: "Community",
        //     items: [
        //       {
        //         label: "Stack Overflow",
        //         href: "https://stackoverflow.com/questions/tagged/docusaurus",
        //       },
        //       {
        //         label: "Discord",
        //         href: "https://discordapp.com/invite/docusaurus",
        //       },
        //       {
        //         label: "Twitter",
        //         href: "https://twitter.com/docusaurus",
        //       },
        //     ],
        //   },
        //   {
        //     title: "More",
        //     items: [
        //       // {
        //       //   label: "Blog",
        //       //   to: "/blog",
        //       // },
        //       {
        //         label: "GitHub",
        //         href: "https://github.com/zakiego",
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright © 2021 - ${new Date().getFullYear()} Merawat Hafalan.`,
      },
      // image: "img/docusaurus.png",
      // twitterImage: "img/docusaurus.png",
      image:
        "https://mieeuwqnxldfwsnwwovq.supabase.in/storage/v1/object/public/public/meta/banner.png",
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: [],
      },
    }),
};

module.exports = config;
