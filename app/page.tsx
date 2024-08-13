import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default async function Home() {
  const blurDelay = 0.1;
  return (
    <div className="flex flex-col mt-2">
      <BlurFade delay={blurDelay} inView>
        <section
          className="flex-1 bg-cover bg-center relative"
          style={{
            backgroundImage: "url(/background.png)",
          }}
        >
          <div
            className="absolute inset-0 bg-secondary-foreground"
            style={{ opacity: 0.65 }}
          ></div>
          <div className="container mx-auto flex flex-col items-center justify-center h-full px-4 py-16 md:py-56 relative">
            <BlurFade delay={blurDelay * 1.5} inView>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4 animate-fade-in">
                Geri Bildirimde{" "}
                <span className="relative inline-block p-2">
                  <span className="absolute inset-0 bg-white -rotate-2 transform -z-10"></span>
                  <span className="relative  text-primary">Nacizane</span>
                </span>{" "}
                Dokunuş!
              </h1>
            </BlurFade>
            <BlurFade delay={blurDelay * 2} inView>
              <p className="text-lg md:text-xl text-white/80 text-center max-w-3xl animate-fade-in delay-100">
                Geliştiriciler arasında yapıcı geri bildirimlerle büyümenin en
                şeffaf yolu! Nacizane, bu süreci anonim ve etkili bir şekilde
                yapmanıza olanak tanır.
              </p>
            </BlurFade>
          </div>
        </section>
      </BlurFade>
      <section className="flex-1">
        <div className="container mx-auto flex flex-col items-center justify-center h-full px-4 pt-10 md:pt-20">
          <BlurFade delay={blurDelay * 2.5} inView>
            <h2 className="text-4xl md:text-6xl font-extrabold text-secondary-foreground text-center mb-4 animate-fade-in">
              Nasıl{" "}
              <span className="relative inline-block p-2">
                <span className="absolute inset-0 bg-primary -rotate-2 transform -z-10"></span>
                <span className="relative  text-white">Çalışır?</span>
              </span>
            </h2>
          </BlurFade>
          <BlurFade delay={blurDelay * 3} inView>
            <p className="text-lg md:text-xl text-black/80 text-center max-w-3xl animate-fade-in delay-100">
              Nacizane, geliştiricilerin profillerini paylaşabileceği ve diğer
              geliştiricilerden geri bildirim alabileceği bir platformdur.
            </p>
          </BlurFade>
        </div>
      </section>
      <section className="pb-6 md:pb-12 lg:pb-24 pt-4 md:pt-8 lg:pt-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <BlurFade delay={blurDelay * 3.5} inView>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card className="px-6 py-12 rounded-2xl shadow-xl h-full">
                <div className="space-y-4 ">
                  <Image src="/feedback.png" width="72" height="72" alt="" />
                  <h3 className="text-2xl font-bold">Anonim ve Güvenli</h3>
                  <p className="text-muted-foreground">
                    Gerçek düşüncelerinizi çekinmeden paylaşın. Naçizane,
                    anonimlik ve gizliliği en üst düzeyde tutar.
                  </p>
                </div>
              </Card>
              <Card className="px-6 py-12 rounded-2xl shadow-xl h-full">
                <div className="space-y-4">
                  <Image src="/yapici.png" width="72" height="72" alt="" />
                  <h3 className="text-2xl font-bold">Yapıcı Geri Bildirim</h3>
                  <p className="text-muted-foreground">
                    Nacizane, verdiğiniz geri bildirimleri yapıcılık açısından
                    AI ile kontrol eder, böylece geri bildirimleriniz her zaman
                    pozitif bir etki yaratır.
                  </p>
                </div>
              </Card>
              <Card className="px-6 py-12  rounded-2xl shadow-xl h-full">
                <div className="space-y-4">
                  <Image src="/dusunceler.png" width="72" height="72" alt="" />
                  <h3 className="text-2xl font-bold">
                    Gerçek Düşünceleri Öğrenin
                  </h3>
                  <p className="text-muted-foreground">
                    İnsanların sizin hakkınızdaki düşüncelerini anonim olarak
                    öğrenme fırsatını yakalayın. Nacizane ile kendinizi
                    geliştirmek için samimi geri bildirimler alın.
                  </p>
                </div>
              </Card>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
