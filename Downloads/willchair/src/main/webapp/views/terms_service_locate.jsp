<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>작은시선 위치기반서비스 이용약관</title>
    <style>
        html, body, div, span, applet, object, iframe,
        h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code,
        del, dfn, em, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var,
        b, u, i, center,
        dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend,
        table, caption, tbody, tfoot, thead, tr, th, td,
        article, aside, canvas, details, embed, 
        figure, figcaption, footer, header, hgroup, 
        menu, nav, output, ruby, section, summary,
        time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            box-sizing: border-box;
        }
        body{width:100%; line-height: 1.4; color:#333; overflow-x:hidden;}
        ol,ul,li{list-style:none;}
        .terms_wrp{padding:25px; font-size:14px;}
        .terms_wrp p{padding:8px 0;}
        .terms_tit{margin:-25px -25px 20px; padding:14px 25px; background-color:#eee;}
        .terms_sec{margin:30px 0; padding:12px; border-top:1px solid #ddd;}
        .terms_sec h2{margin:15px 0; font-size:1.25em;}
        .terms_sec h3{padding:12px 0; font-size:1.15em;}
        .terms_sec h4{padding:6px 0;font-weight:500;}
        .terms_sec strong{display:inline-block; margin-top:12px;}
        .terms_sec li{margin-top:10px;}
        .terms_list ul,.terms_list ol{margin-left:8px;}
        .terms_table{margin-bottom:15px; width:100%; border-collapse: collapse;}
        .terms_table th,td{border:solid #ddd; border-width:1px 0; padding:6px 10px;}
        .terms_table th{width:30%; background-color:#f5f5f5;}
        @media screen and (max-width:360px){
            .terms_wrp{padding:15px;}
            .terms_tit{margin:-15px -15px 15px; padding:10px 15px;}
        }
    </style>
</head>
<body>
    <article class="terms_wrp">
        <h1 class="terms_tit">위치기반서비스 이용약관</h1>
        <section class="terms_sec">
            <h3>제 1 조 (목적)</h3>
            <p>이 약관은 윌체어 (이하 “협동조합 작은시선”)가 제공하는 위치정보사업 또는 위치기반서비스사업과 관련하여 회사와 개인위치정보주체와의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
        </section>
        <section class="terms_sec">
            <h3>제 2 조 (약관 외 준칙)</h3>
            <p>이 약관에 명시되지 않은 사항은 위치정보의 보호 및 이용 등에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 전기통신기본법, 전기통신사업법 등 관계법령과 회사의 이용약관 및 개인정보처리방침, 회사가 별도로 정한 지침 등에 의합니다.</p>
        </section>
        <section class="terms_sec">
            <h3>제 3 조 (서비스 내용 및 요금)</h3>
            <ol class="terms_list">
                <li>
                    ①회사는 직접 위치정보를 수집하거나 위치정보사업자로부터 위치정보를 전달받아 아래와 같은 위치기반서비스를 제공합니다.
                    <ul>
                        <li>• 위치정보를 활용한 검색결과 제공 서비스: 정보 검색을 요청하거나 개인위치정보주체 또는 이동성 있는 기기의 위치정보를 제공 시 본 위치정보를 이용한 검색결과 및 주변결과(맛집, 주변업체 등)를 제시합니다.</li>
                        <li>• 이용자 위치를 활용한 광고정보 제공: 검색결과 또는 기타 서비스 이용 과정에서 개인위치정보주체 또는 이동성 있는 기기의 위치를 이용하여 광고소재를 제시합니다.</li>
                        <li>• 이용자 보호 및 부정 이용 방지: 개인위치정보주체 또는 이동성 있는 기기의 위치를 이용하여 권한없는 자의 비정상적인 서비스 이용 시도 등을 차단합니다.</li>
                        <li>• 길 안내 등 생활편의 서비스 제공: 교통정보와 길 안내 등 최적의 경로를 지도로 제공하며, 주변 시설물 찾기 등 다양한 생활 편의 서비스를 제공합니다.</li>
                    </ul>
                </li>
                <li>②제1항 위치기반서비스의 이용요금은 무료입니다.</li>
            </ol>
        </section>
        <section class="terms_sec">
            <h3>제 4 조 (개인위치정보주체의 권리)</h3>
            <ul class="terms_list">
                <li>• 개인위치정보주체는 개인위치정보 수집 범위 및 이용약관의 내용 중 일부 또는 개인위치정보의 이용ㆍ제공 목적, 제공받는 자의 범위 및 위치기반서비스의 일부에 대하여 동의를 유보할 수 있습니다.</li>
                <li>• 개인위치정보주체는 개인위치정보의 수집ㆍ이용ㆍ제공에 대한 동의의 전부 또는 일부를 철회할 수 있습니다.</li>
                <li>• 개인위치정보주체는 언제든지 개인위치정보의 수집ㆍ이용ㆍ제공의 일시적인 중지를 요구할 수 있습니다.<br>이 경우 회사는 요구를 거절하지 아니하며, 이를 위한 기술적 수단을 갖추고 있습니다</li>
                <li>
                    • 개인위치정보주체는 회사에 대하여 아래 자료의 열람 또는 고지를 요구할 수 있고, 당해 자료에 오류가 있는 경우에는 그 정정을 요구할 수 있습니다.<br>이 경우 회사는 정당한 이유 없이 요구를 거절하지 아니합니다.
                    <ul>
                        <li>• 개인위치정보주체에 대한 위치정보 수집ㆍ이용ㆍ제공사실 확인자료</li>
                        <li>• 개인위치정보주체의 개인위치정보가 위치정보의 보호 및 이용 등에 관한 법률 또는 다른 법령의 규정에 의하여 제3자에게 제공된 이유 및 내용</li>
                    </ul>
                </li>
                <li>• 회사는 개인위치정보주체가 동의의 전부 또는 일부를 철회한 경우에는 지체 없이 수집된 개인위치정보 및 위치정보 수집ㆍ이용ㆍ제공사실 확인자료를 파기합니다.<br>단, 동의의 일부를 철회하는 경우에는 철회하는 부분의 개인위치정보 및 위치정보 수집ㆍ이용ㆍ제공사실 확인자료에 한합니다.</li>
                <li>• 개인위치정보주체는 제1항 내지 제4항의 권리행사를 위하여 이 약관 제13조의 연락처를 이용하여 회사에 요구할 수 있습니다.</li>
            </ul>
        </section>
        <section class="terms_sec">
            <h3>제 5 조 (법정대리인의 권리)</h3>
            <ul class="terms_list">
                <li>• 회사는 만14세 미만 아동으로부터 개인위치정보를 수집ㆍ이용 또는 제공하고자 하는 경우에는 만14세 미만 아동과 그 법정대리인의 동의를 받아야 합니다.</li>
                <li>• 법정대리인은 만14세 미만 아동의 개인위치정보를 수집ㆍ이용ㆍ제공에 동의하는 경우 동의유보권, 동의철회권 및 일시중지권, 열람ㆍ고지요구권을 행사할 수 있습니다.</li>
            </ul>
        </section>
        <section class="terms_sec">
            <h3>제 6 조 (위치정보 이용ㆍ제공사실 확인자료 보유근거 및 보유기간)</h3>
            <p>회사는 위치정보의 보호 및 이용 등에 관한 법률 제16조 제2항에 근거하여 개인위치정보주체에 대한 위치정보 수집ㆍ이용ㆍ제공사실 확인자료를 위치정보시스템에 자동으로 기록하며, 6개월 이상 보관합니다.</p>
        </section>
        <section class="terms_sec">
            <h3>제 7 조 (서비스의 변경 및 중지)</h3>
            <ul class="terms_list">
                <li>• 회사는 위치정보사업자의 정책변경 등과 같이 회사의 제반 사정 또는 법률상의 장애 등으로 서비스를 유지할 수 없는 경우, 서비스의 전부 또는 일부를 제한, 변경하거나 중지할 수 있습니다.</li>
                <li>• 제1항에 의한 서비스 중단의 경우에는 회사는 사전에 인터넷 등에 공지하거나 개인위치정보주체에게 통지합니다.</li>
            </ul>
        </section>
        <section class="terms_sec">
            <h3>제 8 조 (개인위치정보 제3자 제공시 즉시 통보)</h3>
            <ul class="terms_list">
                <li>• 회사는 개인위치정보주체의 동의 없이 당해 개인위치정보주체의 개인위치정보를 제3자에게 제공하지 아니하며, 제3자 제공 서비스를 제공하는 경우에는 제공 받는 자 및 제공목적을 사전에 개인위치정보주체에게 고지하고 동의를 받습니다.</li>
                <li>• 회사는 개인위치정보를 개인위치정보주체가 지정하는 제3자에게 제공하는 경우에는 개인위치정보를 수집한 당해 통신단말장치로 매회 개인위치정보주체에게 제공받는 자, 제공일시 및 제공목적을 즉시 통보합니다.</li>
                <li>
                    • 다만, 아래에 해당하는 경우에는 개인위치정보주체가 미리 특정하여 지정한 통신단말장치 또는 전자우편주소 등으로 통보합니다.
                    <ul>
                        <li>• 개인위치정보를 수집한 당해 통신단말장치가 문자, 음성 또는 영상의 수신기능을 갖추지 아니한 경우</li>
                        <li>• 개인위치정보주체가 개인위치정보를 수집한 당해 통신단말장치 외의 통신단말장치 또는 전자우편주소 등으로 통보할 것을 미리 요청한 경우</li>
                    </ul>
                </li>
            </ul>
        </section>
        <section class="terms_sec">
            <h3>제 9 조 (8세 이하의 아동 등의 보호의무자의 권리)</h3>
            <ul class="terms_list">
                <li>
                    • 회사는 아래의 경우에 해당하는 자(이하 “8세 이하의 아동”등이라 한다)의 보호의무자가 8세 이하의 아동 등의 생명 또는 신체보호를 위하여 개인위치정보의 이용 또는 제공에 동의하는 경우에는 본인의 동의가 있는 것으로 봅니다.
                    <ul>
                        <li>• 8세 이하의 아동</li>
                        <li>• 금치산자</li>
                        <li>• 장애인복지법제2조제2항제2호의 규정에 의한 정신적 장애를 가진 자로서 장애인고용촉진및직업재활법 제2조제2호의 규정에 의한 중증장애인에 해당하는 자(장애인복지법 제29조의 규정에 의하여 장애인등록을 한 자에 한한다)</li>
                    </ul>
                </li>
                <li>• 8세 이하의 아동 등의 생명 또는 신체의 보호를 위하여 개인위치정보의 이용 또는 제공에 동의를 하고자 하는 보호의무자는 서면동의서에 보호의무자임을 증명하는 서면을 첨부하여 회사에 제출하여야 합니다.</li>
                <li>• 보호의무자는 8세 이하의 아동 등의 개인위치정보 이용 또는 제공에 동의하는 경우 개인위치정보주체 권리의 전부를 행사할 수 있습니다.</li>
            </ul>
        </section>
        <section class="terms_sec">
            <h3>제 10 조 (손해배상)</h3>
            <p>개인위치정보주체는 회사의 위치정보의 보호 및 이용 등에 관한 법률 제15조 내지 26조의 규정을 위반한 행위로 손해를 입은 경우에 회사에 대하여 손해배상을 청구할 수 있습니다. 이 경우 회사는 고의 또는 과실이 없음을 입증하지 아니하면 책임을 면할 수 없습니다.</p>
        </section>
        <section class="terms_sec">
            <h3>제 11 조 (분쟁의 조정)</h3>
            <ul class="terms_list">
                <li>• 위치정보와 관련된 분쟁에 대하여 개인위치정보주체와 협의가 이루어지지 아니하거나 협의를 할 수 없는 경우에는 방송통신위원회에 재정을 신청할 수 있습니다.</li>
                <li>• 회사 또는 개인위치정보주체는 위치정보와 관련된 분쟁에 대해 당사자간 협의가 이루어지지 아니하거나 협의를 할 수 없는 경우에는 개인정보보호법에 따라 개인정보분쟁조정위원회에 조정을 신청할 수 있습니다.</li>
            </ul>
        </section>
        <section class="terms_sec">
            <h3>제 12 조 (사업자 정보)</h3>
            <p>회사의 상호, 주소, 전화번호 그 밖의 연락처는 다음과 같습니다.</p>
            <table class="terms_table">
                <tr>
                    <th>상호</th>
                    <td>협동조합 작은시선</td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td>경남 진주시 동진로 99, 2층 소셜캠퍼스 온 </td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td>010-3166-1206</td>
                </tr>
                <tr>
                    <th>이메일 주소</th>
                    <td>barrierfree055@naver.com</td>
                </tr>
            </table>
        </section>
        <div class="terms_add">
            <p>[ 부칙 ]</p>
            <p>본 약관은 2021년 07월 18일부터 적용됩니다.</p>
            <p>제 2 조 위치정보관리 책임자 정보</p>
            <p>회사는 다음과 같이 위치정보 관리책임자를 지정하여 이용자들이 서비스 이용과정에서 발생한 민원사항 처리를 비롯하여 개인위치정보주체의 권리 보호를 위해 힘쓰고 있습니다.</p>  
            <dl>
                <dt>위치정보 관리책임자 :</dt>
                <dd>협동조합 작은시선 대표 조준섭</dd>
                <dt>전화번호 :</dt>
                <dd>010-3166-1206</dd>
                <dt>이메일 주소 :</dt>
                <dd>xodwk8011@gmail.com</dd>
            </dl>
        </div>
    </article>
</body>
</html>