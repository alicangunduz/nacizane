import React from "react";

function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Kullanım Koşulları</h1>
          <p>
            <strong>Son Güncelleme Tarihi:</strong> 11 Eylül 2024
          </p>

          <h2 className="font-semibold">1. Kabul Şartları</h2>
          <p>
            Nacizane`ye erişim ve kullanımınız, bu Kullanım Koşullarına tabidir.
            Nacizane`yi kullanarak, bu koşulları okuduğunuzu, anladığınızı ve
            kabul ettiğinizi beyan edersiniz. Eğer bu koşulları kabul
            etmiyorsanız, Nacizane`yi kullanmaktan vazgeçmelisiniz.
          </p>

          <h2 className="font-semibold">2. Hizmet Açıklaması</h2>
          <p>
            Nacizane, kullanıcıların birbirlerine anonim geri bildirim
            vermelerini sağlayan bir platformdur. Platformda yapılan geri
            bildirimlerin yapıcı ve uygun olması gerekmektedir. Geri
            bildirimler, yapıcılık açısından yapay zeka tarafından kontrol
            edilmektedir. Bu platform, gelişim takibi yapmaz; kullanıcılar
            yalnızca diğerlerinin düşüncelerini anonim olarak öğrenme fırsatı
            bulurlar.
          </p>

          <h2 className="font-semibold">3. Kullanıcı Yükümlülükleri</h2>
          <p>
            Nacizane`yi kullanırken sağladığınız geri bildirimlerin yapıcı,
            saygılı ve hukuka uygun olması gerekmektedir. Geri bildirimlerinizde
            suç teşkil eden, yasa dışı veya başkalarının haklarını ihlal eden
            içerik kullanmanız yasaktır. Hesabınızı güvenli bir şekilde
            kullanmak ve başkalarına devretmemekle sorumlusunuz.
          </p>

          <h2 className="font-semibold">4. Anonimlik</h2>
          <p>
            Nacizane, geri bildirimlerin anonim olmasını sağlamak için gerekli
            teknik önlemleri alır. Ancak, platform üzerinde suç teşkil eden veya
            yasaları ihlal eden bir durum tespit edilirse, ilgili yetkililerle
            iş birliği yapılacak ve anonimlik iptal edilebilecektir.
          </p>

          <h2 className="font-semibold">5. Fikri Mülkiyet Hakları</h2>
          <p>
            Nacizane`nin tüm içerik, tasarım, yazılım ve diğer fikri mülkiyet
            hakları Ali Can Gündüz`e aittir. Nacizane platformu, ticari olmayan
            kişisel kullanım amacıyla lisanslanmıştır ve bu lisans, sınırlı ve
            devredilemezdir.
          </p>

          <h2 className="font-semibold">6. Sorumluluğun Sınırlandırılması</h2>
          <p>
            Nacizane, kullanıcıların platform üzerindeki etkileşimlerinden
            sorumlu tutulamaz. Platform üzerinden verilen geri bildirimlerin
            doğruluğu, içeriği ve sonuçları tamamen kullanıcının
            sorumluluğundadır. Nacizane, herhangi bir kayıp veya zarardan dolayı
            sorumlu tutulamaz.
          </p>

          <h2 className="font-semibold">7. Hizmette Değişiklik</h2>
          <p>
            Nacizane, hizmetlerinde herhangi bir değişiklik yapma hakkını saklı
            tutar. Hizmeti genişletebilir, daraltabilir, askıya alabilir veya
            tamamen sonlandırabilir.
          </p>

          <h2 className="font-semibold">8. Hesap İptali</h2>
          <p>
            Nacizane, kullanım koşullarını ihlal eden veya platformun sağlıklı
            işleyişine zarar veren hesapları askıya alma veya iptal etme hakkını
            saklı tutar.
          </p>

          <h2 className="font-semibold">9. Değişiklikler</h2>
          <p>
            Nacizane, bu Kullanım Koşulları`nda dilediği zaman değişiklik
            yapabilir. Koşullardaki değişiklikler, yayınlandığı andan itibaren
            geçerlilik kazanır. Kullanıcılar, bu değişiklikleri kabul ederek
            platformu kullanmaya devam ederler.
          </p>

          <h2 className="font-semibold">10. Yasal Uyuşmazlıklar</h2>
          <p>
            Bu Kullanım Koşulları, Türkiye Cumhuriyeti kanunlarına tabidir.
            Herhangi bir anlaşmazlık durumunda, Tunceli Adliyesi Mahkemeleri ve
            İcra Daireleri yetkili olacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
