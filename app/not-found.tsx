import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Sen buralara nerden geldin
        </h1>
        <p className="mt-4 text-muted-foreground">
          Üzgünüm ama aradığınız sayfa bulunamadı. Belki de yanlış bir şeyler
          yaptınız ya da sayfa taşındı. Eğer bir hata olduğunu düşünüyorsanız
          lütfen{" "}
          <a
            href="mailto:hi@alicangunduz.dev"
            className="text-primary font-medium underline"
          >
            hi@alicangunduz.dev
          </a>{" "}
          adresine mail atarak bana ulaşın.
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="inline-flex items-center rounded-2xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:shadow-md hover:bg-primary-dark transition-colors duration-300 ease-in-out"
          prefetch={false}
        >
          Anasayfaya Dön
        </Link>
      </div>
    </div>
  );
}
