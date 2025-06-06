import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqData = [
    {
      category: "訂購相關",
      questions: [
        {
          question: "如何下訂單？",
          answer:
            "選擇您喜歡的商品，點擊「加入購物車」，確認購物車內容後點擊「結帳」，填寫配送資訊和付款方式即可完成訂單。",
        },
        {
          question: "可以修改或取消訂單嗎？",
          answer:
            "訂單成立後30分鐘內可以聯繫客服修改或取消。超過時間或已出貨的訂單恕無法修改，但可依退換貨政策辦理退貨。",
        },
        {
          question: "如何查詢訂單狀態？",
          answer:
            "請保留訂單確認email中的訂單編號，可撥打客服電話或發送email查詢訂單處理狀態。",
        },
        {
          question: "可以指定配送時間嗎？",
          answer:
            "目前提供平日配送服務，無法指定確切時間。如有特殊需求請聯繫客服，我們會盡力配合。",
        },
      ],
    },
    {
      category: "商品相關",
      questions: [
        {
          question: "商品材質說明？",
          answer:
            "我們的商品採用925純銀、14K金、玫瑰金等優質材質。每件商品頁面都有詳細的材質說明，購買前請仔細閱讀。",
        },
        {
          question: "如何選擇合適的尺寸？",
          answer:
            "商品頁面提供詳細尺寸資訊。項鍊建議40-60cm，手鍊建議比手腕周長多1-2cm。如需協助可聯繫客服提供選購建議。",
        },
        {
          question: "商品有保固嗎？",
          answer:
            "所有商品享有6個月品質保固，非人為損壞的品質問題可免費維修或更換。保固不包含正常磨損、刮傷等。",
        },
        {
          question: "可以客製化嗎？",
          answer:
            "部分商品提供刻字或尺寸客製服務，詳情請聯繫客服詢問。客製化商品製作時間較長，且不適用退換貨政策。",
        },
      ],
    },
    {
      category: "配送相關",
      questions: [
        {
          question: "配送需要多久時間？",
          answer:
            "一般商品1-3個工作日出貨，標準配送約1-2天到貨。偏遠地區可能需要額外1-2天。實際配送時間依物流狀況而定。",
        },
        {
          question: "配送範圍包含哪些地區？",
          answer:
            "目前配送範圍涵蓋台灣本島及離島地區。海外配送服務正在規劃中，請持續關注我們的最新消息。",
        },
        {
          question: "運費如何計算？",
          answer:
            "台灣本島滿NT$1,500免運費，未滿收取NT$100運費。離島地區運費NT$150，滿NT$2,000免運費。",
        },
        {
          question: "可以超商取貨嗎？",
          answer: "目前提供宅配到府服務，超商取貨服務即將推出，敬請期待。",
        },
      ],
    },
    {
      category: "付款相關",
      questions: [
        {
          question: "有哪些付款方式？",
          answer:
            "支援信用卡付款（VISA、MasterCard、JCB、美國運通）和貨到付款。信用卡提供分期付款服務，詳見付款方式頁面。",
        },
        {
          question: "信用卡付款安全嗎？",
          answer:
            "我們採用SSL加密技術和銀行級安全防護，與知名金融機構合作，確保您的付款資訊安全。",
        },
        {
          question: "可以開立發票嗎？",
          answer:
            "可以開立電子發票或統一發票。結帳時請選擇發票類型並填寫相關資訊。公司戶請提供統一編號。",
        },
        {
          question: "分期付款的條件？",
          answer:
            "消費滿NT$3,000可申請3期0利率，滿NT$6,000可申請6期，滿NT$12,000可申請12期。實際條件依各銀行規定為準。",
        },
      ],
    },
    {
      category: "退換貨相關",
      questions: [
        {
          question: "退換貨期限是多久？",
          answer:
            "商品到貨後30天內可申請退換貨。商品需保持原狀，包含完整包裝、吊牌、說明書等。",
        },
        {
          question: "退換貨運費誰負擔？",
          answer:
            "商品瑕疵或錯誤配送由本公司負擔運費。個人因素退換貨由客戶負擔來回運費。",
        },
        {
          question: "退款多久可以收到？",
          answer:
            "收到退貨商品後3-5個工作日處理退款。信用卡退款5-10個工作日，貨到付款退款3-5個工作日匯入指定帳戶。",
        },
        {
          question: "哪些商品不能退換？",
          answer:
            "已配戴使用、客製化商品、超過退換期限、包裝不完整或人為損壞的商品不能退換。",
        },
      ],
    },
    {
      category: "會員相關",
      questions: [
        {
          question: "註冊會員有什麼好處？",
          answer:
            "會員享有專屬優惠、生日禮、積分回饋、優先通知新品資訊等福利。註冊完全免費且操作簡單。",
        },
        {
          question: "忘記密碼怎麼辦？",
          answer:
            "請點擊登入頁面的「忘記密碼」，輸入註冊email，系統會發送重設密碼連結到您的信箱。",
        },
        {
          question: "如何修改會員資料？",
          answer:
            "登入會員後進入「我的帳戶」即可修改個人資料、配送地址、密碼等資訊。",
        },
        {
          question: "積分如何使用？",
          answer:
            "每消費NT$100可獲得1點積分，累積達100點可於下次購物折抵NT$100。積分有效期限為一年。",
        },
      ],
    },
  ];

  const filteredFAQ = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* 頁面標題 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">❓ 常見問題</h1>
          <p className="text-gray-600 text-lg">
            快速找到您需要的答案，讓購物更順暢
          </p>
        </div>

        {/* 搜尋框 */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="搜尋問題關鍵字..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ 內容 */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQ.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-primary border-b-2 border-primary pb-2">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);

                  return (
                    <div
                      key={globalIndex}
                      className="bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <span className="font-semibold text-gray-900">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="text-primary" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-400" size={20} />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredFAQ.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                找不到相關問題，請嘗試其他關鍵字或聯繫客服
              </p>
            </div>
          )}
        </div>

        {/* 聯繫客服 */}
        <div className="rounded-lg p-8 mt-12" style={{backgroundColor: '#efe7d6'}}>
          <h2 className="text-2xl font-bold text-center mb-6">
            還是找不到答案？
          </h2>
          <p className="text-center text-gray-600 mb-8">
            我們的客服團隊隨時為您提供協助
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Phone className="mx-auto mb-4 text-primary" size={32} />
              <h3 className="font-semibold mb-2">電話客服</h3>
              <p className="text-primary font-semibold">(02) 1234-5678</p>
              <p className="text-sm text-gray-600 mt-1">
                週一至週五 9:00-18:00
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <Mail className="mx-auto mb-4 text-primary" size={32} />
              <h3 className="font-semibold mb-2">Email客服</h3>
              <p className="text-primary font-semibold">
                service@elegantjewelry.com
              </p>
              <p className="text-sm text-gray-600 mt-1">24小時內回覆</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <MessageCircle className="mx-auto mb-4 text-primary" size={32} />
              <h3 className="font-semibold mb-2">線上客服</h3>
              <p className="text-primary font-semibold">即時線上諮詢</p>
              <p className="text-sm text-gray-600 mt-1">
                週一至週五 9:00-18:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
