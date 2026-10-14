import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";

export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 rounded-3xl bg-secondary p-8 sm:p-12 lg:p-16 text-white shadow-xl">
        <div className="max-w-xl text-center lg:text-left">
          <h2 className="font-montserrat font-bold text-xl sm:text-2xl text-muted">
            Присоединяйтесь к сообществу
          </h2>
          <p className="font-montserrat text-xs sm:text-sm text-muted/80 mt-2">
            Узнавайте первыми о закрытых релизах, акциях и обновлении коллекций.
          </p>
        </div>

        <div className="w-full lg:w-auto">
          <form className="relative flex w-full max-w-md mx-auto lg:mx-0">
            <Input
              type="email"
              placeholder="Введите ваш e-mail"
              className="h-14 w-full rounded-xl bg-background/10 border-background/15 pr-36 pl-4 font-montserrat text-xs text-muted placeholder:text-muted/70 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            />
            <Button
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 h-11 px-5 rounded-lg bg-primary font-hanken text-xs font-semibold text-muted hover:bg-primary/90 transition-colors uppercase"
            >
              Подписаться
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
