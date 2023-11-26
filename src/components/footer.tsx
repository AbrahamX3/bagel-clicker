export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-[8vh] md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://www.abraham.lat/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 transition-colors duration-150 hover:text-primary"
            >
              AbrahamX3
            </a>
            . Source code available on{" "}
            <a
              href="https://github.com/AbrahamX3/bagel-clicker"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 transition-colors duration-150 hover:text-primary"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
