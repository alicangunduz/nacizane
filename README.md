# Nacizane.co

Nacizane.co, insanların birbirlerine anonim olarak dürüst ve yapıcı geri bildirimde bulunmalarını sağlayan, geri bildirimleri yapay zeka moderasyonundan geçiren full-stack bir anonim geri bildirim web uygulamasıdır.

## Kullanılan Teknolojiler

- **ReactJS** 
- **Next.js 14** 
- **TypeScript** 
- **Prisma**
- **NextAuth** 
- **Gemini API** 

## Kurulum

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### Gereksinimler

- Node.js v20 veya üzeri
- NPM 10 veya üzeri
- PostgreSQL 16 veritabanı

### Adımlar

1. **Projeyi klonlayın:**

```bash
git clone https://github.com/alicangunduz/nacizane.co.git
cd nacizane.co
```

2. **Ortam değişkenlerini ayarlayın:**

`.env.example` dosyasını kopyalayın ve `.env` adında bir dosya oluşturun. Daha sonra veritabanı ve GitHub OAuth ayarlarınızı bu dosyada yapılandırın:

```bash
cp .env.example .env
```

3. **Bağımlılıkları yükleyin:**

```bash
npm install
```

4. **Prisma ile veritabanı yapılandırmasını oluşturun:**

```bash
npx prisma generate
```

5. **Prisma ile veritabanı yapılandırmasını oluşturun:**

```bash
npx prisma db push
```

6. **Geliştirme ortamında projeyi başlatın:**

```bash
npm run dev
```

### Not: `.env` dosyasındaki tüm gerekli değişkenlerin doğru ayarlandığından emin olun.


## Kimlik Doğrulama

Proje, NextAuth kütüphanesini kullanarak GitHub OAuth ile kullanıcı kimlik doğrulama işlemi yapmaktadır. Gerekli GitHub OAuth bilgilerini `.env` dosyanıza ekleyerek projeyi çalıştırabilirsiniz.

## Ortam Değişkenleri

Aşağıdaki ortam değişkenleri `.env` dosyasına eklenmelidir:

```bash
# Veritabanı ayarları
DATABASE_URL=postgresql://user:password@localhost:5432/nacizane?schema=public

# GitHub OAuth ayarları
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Callback URL
CALLBACK_URL=http://localhost:3000

# NextAuth ayarları
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# API anahtarları
GEMINI_API_KEY=your_gemini_api_key
```

## Dağıtım

Projeyi herhangi bir platformda dağıtabilirsiniz. Önerilen dağıtım platformları:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS](https://aws.amazon.com/)

## Katkıda Bulunma

Katkıda bulunmak isterseniz, lütfen aşağıdaki adımları takip edin:

1. Bu projeyi fork'layın.
2. Kendi branch'inizde bir özellik ekleyin: `git checkout -b yeni-ozellik`
3. Değişikliklerinizi commit'leyin: `git commit -m 'Yeni özellik ekle'`
4. Branch'inizi push'layın: `git push origin yeni-ozellik`
5. Bir Pull Request açın.

## Lisans

Bu proje, **Creative Commons Non-Commercial License** altında lisanslanmıştır. Projeyi ticari amaçla kullanmanız yasaktır. Ayrıntılı bilgi için `LICENSE` dosyasını inceleyebilirsiniz.
