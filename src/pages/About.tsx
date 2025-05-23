import React from "react";
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">關於我們</h1>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            優雅飾品成立於2010年，致力於為每位顧客提供高品質、風格獨特的珠寶飾品。
          </p>
        </div>
      </div>

      {/* 品牌故事 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">我們的故事</h2>
              <p className="text-gray-700 mb-4">
                優雅飾品的故事始於創辦人李美玲的一個簡單願望：創造出既美麗又實用、既高雅又親民的珠寶飾品。
              </p>
              <p className="text-gray-700 mb-4">
                畢業於紐約時尚設計學院的美玲，在國際知名珠寶品牌工作多年後，決定回到台灣創立自己的品牌。她相信珠寶不僅是裝飾品，更是情感的載體，每一件作品都應該有自己的故事和靈魂。
              </p>
              <p className="text-gray-700 mb-4">
                從一間小工作室開始，優雅飾品如今已發展成為台灣知名的珠寶品牌，擁有多家實體店面和線上平台，服務遍及全台灣。
              </p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/600x400/F3F4F6/000000?text=品牌故事"
                alt="品牌故事"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 我們的價值 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">我們的價值</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              title="品質承諾"
              description="我們只使用最優質的材料，經過嚴格的品質控制，確保每件產品都達到最高標準。"
              icon={
                <svg
                  className="h-12 w-12 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              }
            />
            <ValueCard
              title="創新設計"
              description="我們的設計師不斷探索新材料和技術，打破傳統界限，創造出既時尚又經典的作品。"
              icon={
                <svg
                  className="h-12 w-12 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              }
            />
            <ValueCard
              title="顧客至上"
              description="我們重視每位顧客的需求和反饋，提供專業的諮詢服務和售後保障，確保最佳的購物體驗。"
              icon={
                <svg
                  className="h-12 w-12 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* 我們的團隊 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">我們的團隊</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TeamMember
              name="李美玲"
              title="創辦人 & 首席設計師"
              image="https://via.placeholder.com/300x300/F3F4F6/000000?text=李美玲"
              description="畢業於紐約時尚設計學院，擁有超過15年的珠寶設計經驗。"
            />
            <TeamMember
              name="張志明"
              title="工藝總監"
              image="https://via.placeholder.com/300x300/F3F4F6/000000?text=張志明"
              description="師承台灣傳統金工藝師，專精於金屬工藝，帶領工藝團隊確保每件作品的完美呈現。"
            />
            <TeamMember
              name="王雅婷"
              title="市場營銷總監"
              image="https://via.placeholder.com/300x300/F3F4F6/000000?text=王雅婷"
              description="擁有豐富的品牌行銷經驗，負責品牌形象塑造和市場推廣策略。"
            />
          </div>
        </div>
      </section>

      {/* 我們的承諾 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">我們的承諾</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-10 text-lg">
            我們承諾提供最優質的產品和服務，不斷創新和進步，為顧客帶來最好的珠寶體驗。我們相信，真正的美麗來自於對品質的堅持和對細節的關注。
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <Commitment title="精湛工藝" number="100%" />
            <Commitment title="原創設計" number="100%" />
            <Commitment title="售後服務" number="100%" />
            <Commitment title="顧客滿意" number="99.8%" />
          </div>
        </div>
      </section>

      {/* 聯絡我們 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6">聯繫我們</h2>
                <p className="text-gray-600 mb-8">
                  如果您有任何問題、建議或合作提案，歡迎隨時與我們聯繫。我們的客服團隊將竭誠為您服務。
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">地址</h3>
                      <p className="text-gray-600">
                        台北市信義區忠孝東路五段123號
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Email</h3>
                      <p className="text-gray-600">
                        service@elegantjewelry.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-primary mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">電話</h3>
                      <p className="text-gray-600">(02) 1234-5678</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src="https://via.placeholder.com/600x400/F3F4F6/000000?text=門市照片"
                  alt="門市照片"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// 價值卡片元件
interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ValueCard = ({ title, description, icon }: ValueCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// 團隊成員卡片元件
interface TeamMemberProps {
  name: string;
  title: string;
  image: string;
  description: string;
}

const TeamMember = ({ name, title, image, description }: TeamMemberProps) => (
  <div className="text-center">
    <div className="mb-4">
      <img
        src={image}
        alt={name}
        className="w-40 h-40 rounded-full mx-auto object-cover"
      />
    </div>
    <h3 className="text-xl font-bold">{name}</h3>
    <p className="text-primary font-medium mb-2">{title}</p>
    <p className="text-gray-600">{description}</p>
  </div>
);

// 承諾元件
interface CommitmentProps {
  title: string;
  number: string;
}

const Commitment = ({ title, number }: CommitmentProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
    <p className="text-3xl font-bold text-primary mb-2">{number}</p>
    <p className="font-medium">{title}</p>
  </div>
);

export default About;
