# Read & Conquer 추가 테스트케이스 V2

목적:

- 기존 테스트케이스를 보완하는 추가 QA 목록
- 페이지별 10개씩 작성
- 기능/API별 5개씩 작성
- MVP 개발 완료 후 수동 QA, API 테스트, 회귀 테스트에 사용

공통 기준:

- 인증 필요 API는 `Authorization: Bearer {accessToken}` 필수
- 실패 응답은 `{ "code": "ERROR_CODE", "message": "에러 메시지" }`
- 도서관 체크인 반경은 100m
- 최종 보상은 최소 20분, 위치 정상, 페이지 검증, 표지 검증, 감상평 검증이 모두 통과해야 지급

---

## 1. 페이지별 테스트케이스

### 1.1 로그인 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-AUTH-001 | P0 | 최초 진입 상태 | 앱 첫 실행 후 로그인 페이지 확인 | 로그인 외 인증 필요 기능이 노출되지 않는다 |
| V2-PAGE-AUTH-002 | P0 | 로그인 버튼 연속 클릭 방지 | Google 로그인 버튼을 빠르게 여러 번 클릭 | 로그인 요청은 1회만 실행된다 |
| V2-PAGE-AUTH-003 | P0 | OAuth 취소 처리 | Google 로그인 창에서 취소 | 로그인 페이지로 돌아오고 안내 메시지 표시 |
| V2-PAGE-AUTH-004 | P0 | 토큰 만료 후 진입 | 만료 accessToken으로 앱 실행 | refresh 또는 로그인 페이지 이동 처리 |
| V2-PAGE-AUTH-005 | P1 | refresh 실패 처리 | refreshToken 만료 상태로 앱 실행 | 저장 토큰 제거 후 로그인 페이지 표시 |
| V2-PAGE-AUTH-006 | P1 | 약관 링크 이동 | 약관 링크 클릭 | 약관 화면 또는 외부 페이지 정상 이동 |
| V2-PAGE-AUTH-007 | P1 | 개인정보 링크 이동 | 개인정보 처리방침 클릭 | 개인정보 페이지 정상 이동 |
| V2-PAGE-AUTH-008 | P1 | 키보드 접근성 | Tab 키로 버튼 이동 | 로그인 버튼에 포커스가 이동된다 |
| V2-PAGE-AUTH-009 | P2 | 작은 화면 대응 | 320px 폭에서 확인 | 버튼과 문구가 화면 밖으로 넘치지 않는다 |
| V2-PAGE-AUTH-010 | P2 | 다크모드 대응 | 다크모드에서 확인 | 텍스트와 버튼 대비가 충분하다 |

### 1.2 온보딩 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-ONB-001 | P0 | 온보딩 미완료 접근 | 신규 로그인 후 접근 | 프로필 입력 단계가 표시된다 |
| V2-PAGE-ONB-002 | P0 | 온보딩 완료 접근 차단 | 완료 계정으로 URL 직접 접근 | 메인으로 리다이렉트 또는 수정 제한 안내 |
| V2-PAGE-ONB-003 | P0 | 닉네임 공백 제거 | `" JungTem "` 입력 후 저장 | `JungTem`으로 저장된다 |
| V2-PAGE-ONB-004 | P0 | 닉네임 한글 허용 | `정템` 입력 | 사용 가능하면 저장 가능 |
| V2-PAGE-ONB-005 | P0 | 닉네임 언더스코어 허용 | `Jung_Tem` 입력 | 사용 가능하면 저장 가능 |
| V2-PAGE-ONB-006 | P0 | 진영 카드 선택 상태 | 진영 카드 클릭 | 선택된 카드가 명확히 표시된다 |
| V2-PAGE-ONB-007 | P1 | 진영 설명 표시 | 각 진영 카드 확인 | 이름, 색상, 설명이 보인다 |
| V2-PAGE-ONB-008 | P1 | 저장 중 중복 클릭 방지 | 저장 버튼 연속 클릭 | 프로필 등록 요청은 1회만 실행 |
| V2-PAGE-ONB-009 | P1 | 등록 실패 후 복구 | 중복 닉네임으로 저장 실패 | 입력값 유지 및 재시도 가능 |
| V2-PAGE-ONB-010 | P2 | 긴 진영 설명 대응 | 설명이 긴 진영 표시 | 카드 높이가 깨지지 않는다 |

### 1.3 지도 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-MAP-001 | P0 | 지도 초기 로딩 | 메인 진입 | 지도와 내 위치 또는 기본 위치 표시 |
| V2-PAGE-MAP-002 | P0 | 도서관 핀 클릭 | 핀 클릭 | 해당 도서관 상세 바텀시트 표시 |
| V2-PAGE-MAP-003 | P0 | 같은 위치 재조회 방지 | 지도 이동 없이 새로고침 반복 | 불필요한 API 호출이 과도하게 발생하지 않음 |
| V2-PAGE-MAP-004 | P0 | 반경 변경 | 반경 값을 변경 | 변경된 반경 기준으로 목록 갱신 |
| V2-PAGE-MAP-005 | P0 | 점령 색상 범례 | 지도에서 범례 확인 | 진영 색상과 이름이 일치 |
| V2-PAGE-MAP-006 | P1 | 위치 재측정 | 현재 위치 버튼 클릭 | 최신 GPS 기준으로 지도 이동 |
| V2-PAGE-MAP-007 | P1 | 좌표 오류 처리 | GPS 값 비정상 | 기본 위치 또는 오류 안내 표시 |
| V2-PAGE-MAP-008 | P1 | 도서관 검색 결과 없음 | 주변 도서관 없음 | 빈 상태 메시지 표시 |
| V2-PAGE-MAP-009 | P2 | 대량 핀 렌더링 | 도서관 수 많음 | 앱이 멈추지 않고 클러스터링 처리 |
| V2-PAGE-MAP-010 | P2 | 회전/리사이즈 대응 | 화면 방향 전환 | 지도와 바텀시트 레이아웃 유지 |

### 1.4 도서관 상세 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-LIB-001 | P0 | 도서관명 표시 | 상세 진입 | 도서관명이 정확히 표시 |
| V2-PAGE-LIB-002 | P0 | 주소 복사 | 주소 복사 버튼 클릭 | 주소가 클립보드에 복사 |
| V2-PAGE-LIB-003 | P0 | 홈페이지 링크 | 홈페이지 URL 클릭 | 외부 브라우저 또는 웹뷰 이동 |
| V2-PAGE-LIB-004 | P0 | 전화번호 표시 | 전화번호 있는 도서관 조회 | 전화번호 표시 및 전화 연결 가능 |
| V2-PAGE-LIB-005 | P0 | 영향력 0점 표시 | 영향력 없는 진영 존재 | 0점 또는 미참여 상태 표시 |
| V2-PAGE-LIB-006 | P1 | 점령 변경 후 갱신 | complete 후 상세 재조회 | 현재 점령 진영이 갱신 |
| V2-PAGE-LIB-007 | P1 | 내 진영 강조 | 내 진영 영향력 존재 | 내 진영 항목이 강조 |
| V2-PAGE-LIB-008 | P1 | 독서 시작 이동 | 시작 버튼 클릭 | ISBN/세션 시작 화면으로 이동 |
| V2-PAGE-LIB-009 | P1 | 잘못된 상세 ID | 삭제된 도서관 상세 접근 | 도서관 없음 화면 표시 |
| V2-PAGE-LIB-010 | P2 | 긴 주소 줄바꿈 | 긴 주소 도서관 조회 | 주소가 자연스럽게 줄바꿈 |

### 1.5 도서 검색/ISBN 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-BOOK-001 | P0 | 검색어 입력 검색 | 키워드 입력 후 검색 | 관련 도서 목록 표시 |
| V2-PAGE-BOOK-002 | P0 | 빈 검색어 처리 | 빈 값으로 검색 | 검색어 입력 안내 표시 |
| V2-PAGE-BOOK-003 | P0 | ISBN 하이픈 처리 | 하이픈 포함 ISBN 입력 | 정상 ISBN으로 조회 또는 안내 |
| V2-PAGE-BOOK-004 | P0 | 이미 등록된 책 표시 | DB 저장 도서 조회 | 외부 API 없이 빠르게 표시 |
| V2-PAGE-BOOK-005 | P0 | 전체 페이지 없음 | totalPages null 도서 조회 | 페이지 입력 시 초과 검증 제외 또는 안내 |
| V2-PAGE-BOOK-006 | P1 | 추천 목록 클릭 | 추천 도서 선택 | 해당 도서 상세 또는 세션 화면 이동 |
| V2-PAGE-BOOK-007 | P1 | 소장 여부 없음 | 미소장 도서 조회 | 미소장 안내 표시 |
| V2-PAGE-BOOK-008 | P1 | 표지 로딩 실패 | 깨진 cover URL | 기본 표지 이미지 표시 |
| V2-PAGE-BOOK-009 | P2 | 긴 저자명 처리 | 저자명 긴 도서 조회 | UI가 깨지지 않음 |
| V2-PAGE-BOOK-010 | P2 | 검색 페이지네이션 | 다음 페이지 클릭 | 다음 도서 목록 표시 |

### 1.6 독서 진행 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-SESSION-001 | P0 | 진행 중 책 정보 | 세션 시작 후 확인 | 책 제목과 도서관명 표시 |
| V2-PAGE-SESSION-002 | P0 | 백그라운드 복귀 | 앱을 내렸다가 복귀 | 타이머가 실제 경과 시간 기준 유지 |
| V2-PAGE-SESSION-003 | P0 | 위치 이탈 안내 | OUT_OF_RANGE ping 발생 | 경고 메시지 표시 |
| V2-PAGE-SESSION-004 | P0 | 위치 복귀 안내 | 이탈 후 정상 위치 ping | 복귀 상태 표시 |
| V2-PAGE-SESSION-005 | P0 | 다른 세션 시작 차단 | 진행 중 새 세션 시작 시도 | 활성 세션 존재 안내 |
| V2-PAGE-SESSION-006 | P1 | 네트워크 끊김 | ping 요청 실패 | 로컬 재시도 또는 연결 안내 |
| V2-PAGE-SESSION-007 | P1 | 취소 확인 모달 | 취소 버튼 클릭 | 확인 모달 표시 |
| V2-PAGE-SESSION-008 | P1 | 취소 철회 | 취소 모달에서 아니오 | 세션 유지 |
| V2-PAGE-SESSION-009 | P1 | 취소 확정 | 취소 모달에서 예 | 세션 취소 및 보상 없음 |
| V2-PAGE-SESSION-010 | P2 | 긴 세션 시간 표시 | 2시간 이상 진행 | 시간 표시 형식 유지 |

### 1.7 인증 제출 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-SUB-001 | P0 | 카메라 권한 허용 | 표지 촬영 버튼 클릭 | 카메라가 열린다 |
| V2-PAGE-SUB-002 | P0 | 카메라 권한 거부 | 권한 거부 | 권한 설정 안내 표시 |
| V2-PAGE-SUB-003 | P0 | 이미지 재촬영 | 촬영 후 재촬영 클릭 | 새 이미지로 교체 |
| V2-PAGE-SUB-004 | P0 | 감상평 최소 길이 | 너무 짧은 감상평 입력 | 길이 오류 표시 |
| V2-PAGE-SUB-005 | P0 | 감상평 최대 길이 | 500자 초과 입력 | 입력 제한 또는 오류 표시 |
| V2-PAGE-SUB-006 | P0 | 붙여넣기 차단 | 감상평 붙여넣기 시도 | 붙여넣기 제한 또는 경고 |
| V2-PAGE-SUB-007 | P0 | 페이지 자동 계산 | 시작/종료 페이지 입력 | 읽은 페이지 수 표시 |
| V2-PAGE-SUB-008 | P1 | 제출 후 수정 제한 | SUBMITTED 상태 재진입 | 수정 제한 또는 재제출 정책 표시 |
| V2-PAGE-SUB-009 | P1 | 제출 실패 복구 | 서버 오류 발생 | 입력값 유지 후 재시도 가능 |
| V2-PAGE-SUB-010 | P2 | 이미지 용량 큼 | 큰 이미지 제출 | 압축 또는 용량 오류 처리 |

### 1.8 검증/결과 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-RESULT-001 | P0 | 검증 대기 상태 | 제출 직후 결과 화면 진입 | 검증 진행 상태 표시 |
| V2-PAGE-RESULT-002 | P0 | 표지 통과 표시 | visionPassed true | 표지 검증 통과 표시 |
| V2-PAGE-RESULT-003 | P0 | 표지 실패 표시 | visionPassed false | 표지 실패 사유 표시 |
| V2-PAGE-RESULT-004 | P0 | 감상평 통과 표시 | llmPassed true | 감상평 검증 통과 표시 |
| V2-PAGE-RESULT-005 | P0 | 감상평 실패 표시 | llmPassed false | 감상평 실패 사유 표시 |
| V2-PAGE-RESULT-006 | P0 | 페이지 실패 표시 | pageValidationPassed false | 페이지 이상치 안내 |
| V2-PAGE-RESULT-007 | P0 | 위치 실패 표시 | locationValidationPassed false | 위치 이탈 안내 |
| V2-PAGE-RESULT-008 | P0 | 최종 성공 CTA | isPassed true | 보상 확인 버튼 표시 |
| V2-PAGE-RESULT-009 | P0 | 최종 실패 CTA | isPassed false | 다시 시도 또는 메인 이동 버튼 표시 |
| V2-PAGE-RESULT-010 | P2 | 결과 새로고침 | 새로고침 클릭 | 최신 검증 결과 다시 조회 |

### 1.9 마이페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-MY-001 | P0 | EXP 표시 갱신 | 보상 후 마이페이지 진입 | 증가한 EXP 표시 |
| V2-PAGE-MY-002 | P0 | 내 진영 색상 | 프로필 영역 확인 | 진영 색상이 일치 |
| V2-PAGE-MY-003 | P0 | 내 서재 상세 이동 | 도서 항목 클릭 | 독서 기록 상세 표시 |
| V2-PAGE-MY-004 | P0 | 감상평 표시 | 인증 완료 도서 확인 | 작성한 감상평 표시 |
| V2-PAGE-MY-005 | P0 | 누적 시간 표시 | 완료 세션 존재 | 누적 독서 시간 표시 |
| V2-PAGE-MY-006 | P1 | 실패 세션 표시 여부 | 실패 기록 조회 | 세션 기록에는 실패 상태 표시 |
| V2-PAGE-MY-007 | P1 | 기여 도서관 정렬 | 여러 기여 도서관 존재 | 기여 점수 높은 순 표시 |
| V2-PAGE-MY-008 | P1 | 로그아웃 확인 모달 | 로그아웃 클릭 | 확인 모달 표시 |
| V2-PAGE-MY-009 | P2 | 프로필 이미지 없음 | 이미지 없는 사용자 | 기본 아바타 표시 |
| V2-PAGE-MY-010 | P2 | 데이터 로딩 실패 | 마이페이지 API 실패 | 재시도 UI 표시 |

### 1.10 랭킹 페이지

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-PAGE-RANK-001 | P0 | 랭킹 탭 기본값 | 랭킹 페이지 진입 | 개인 랭킹 또는 기본 탭 표시 |
| V2-PAGE-RANK-002 | P0 | 진영 탭 전환 | 진영 탭 클릭 | 진영 랭킹 표시 |
| V2-PAGE-RANK-003 | P0 | 개인 탭 전환 | 개인 탭 클릭 | 개인 랭킹 표시 |
| V2-PAGE-RANK-004 | P0 | 공동 EXP 정렬 | EXP 같은 사용자 존재 | 생성일 또는 서버 정렬 기준 유지 |
| V2-PAGE-RANK-005 | P0 | 점령 수 표시 | 진영 랭킹 조회 | 점령 도서관 수 표시 |
| V2-PAGE-RANK-006 | P0 | 총 영향력 표시 | 진영 랭킹 조회 | totalInfluence 표시 |
| V2-PAGE-RANK-007 | P1 | 내 순위 Top50 밖 | 내 순위가 50위 밖 | 별도 내 순위 영역 또는 미표시 정책 적용 |
| V2-PAGE-RANK-008 | P1 | 랭킹 API 실패 | 서버 오류 | 오류 안내와 재시도 버튼 표시 |
| V2-PAGE-RANK-009 | P2 | 스크롤 성능 | 목록 스크롤 | 끊김 없이 스크롤 |
| V2-PAGE-RANK-010 | P2 | 빈 닉네임 사용자 제외 | 닉네임 없는 사용자 존재 | 랭킹 목록에 표시되지 않음 |

---

## 2. 기능/API별 테스트케이스

### 2.1 Auth API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-AUTH-001 | P0 | idToken 누락 | `/auth/login` 빈 body 요청 | 로그인 실패 |
| V2-API-AUTH-002 | P0 | socialId fallback 로그인 | provider, socialId 요청 | 테스트 계정 로그인 성공 |
| V2-API-AUTH-003 | P0 | 사용자 정보 저장 | Google profile 포함 로그인 | email, name, lastLoginAt 저장 |
| V2-API-AUTH-004 | P1 | access token payload | 로그인 후 JWT 확인 | userId, role, tokenType 포함 |
| V2-API-AUTH-005 | P1 | refresh token 타입 검증 | accessToken으로 refresh 요청 | 401 반환 |

### 2.2 User API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-USER-001 | P0 | 존재하지 않는 사용자 me | 삭제된 userId 토큰 요청 | USER_NOT_FOUND |
| V2-API-USER-002 | P0 | 닉네임 trim 저장 | 공백 포함 닉네임 등록 | trim된 값 저장 |
| V2-API-USER-003 | P0 | 중복 닉네임 등록 | 이미 사용 중 닉네임 등록 | DUPLICATED_NICKNAME |
| V2-API-USER-004 | P0 | 없는 진영 등록 | 잘못된 factionId | PROFILE_NOT_COMPLETED |
| V2-API-USER-005 | P1 | 마이페이지 페이지 크기 | size 변경 요청 | 지정 개수 이하 반환 |

### 2.3 Faction API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-FAC-001 | P0 | 비활성 진영 제외 | isActive=false 진영 존재 | 목록에 제외 |
| V2-API-FAC-002 | P0 | 생성자 저장 | 진영 생성 요청 | createdByUserId 저장 |
| V2-API-FAC-003 | P0 | 이름 중복 | 동일 factionName 생성 | DB unique 에러 처리 |
| V2-API-FAC-004 | P1 | 설명 생략 | description 없이 생성 | 생성 성공 |
| V2-API-FAC-005 | P1 | 멤버 수 계산 | 유저 다수 연결 | memberCount 정확히 반환 |

### 2.4 Library API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-LIB-001 | P0 | DB 후보 우선 | DB에 주변 도서관 존재 | Kakao fallback 없이 DB 결과 반환 |
| V2-API-LIB-002 | P0 | Kakao fallback | DB 후보 없음 | Kakao 검색 후 캐싱 시도 |
| V2-API-LIB-003 | P0 | 거리 필터 | 반경 밖 후보 포함 | 응답에서 제외 |
| V2-API-LIB-004 | P1 | Library Info sync | sync 요청 | 생성/수정/스킵 수 반환 |
| V2-API-LIB-005 | P1 | geocode 빈 주소 | 빈 address 요청 | null 또는 검증 에러 |

### 2.5 Book API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-BOOK-001 | P0 | 기존 DB 도서 우선 | 저장된 ISBN 조회 | 외부 API 호출 없이 반환 |
| V2-API-BOOK-002 | P0 | 외부 도서 저장 필드 | 외부 조회 성공 | description, externalSource 포함 저장 |
| V2-API-BOOK-003 | P0 | 도서 없음 | 외부 결과 없음 | BOOK_NOT_FOUND |
| V2-API-BOOK-004 | P1 | 추천 키워드 전달 | keyword=철학 | 외부 API에 철학 전달 |
| V2-API-BOOK-005 | P1 | 소장 여부 libCode 필수 | libCode 누락 | 검증 실패 |

### 2.6 Session API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-SES-001 | P0 | 온보딩 미완료 시작 차단 | factionId 없는 사용자 | PROFILE_NOT_COMPLETED |
| V2-API-SES-002 | P0 | 없는 도서관 시작 차단 | 잘못된 libraryId | LIBRARY_NOT_FOUND |
| V2-API-SES-003 | P0 | 활성 세션 중복 차단 | IN_PROGRESS 존재 | ACTIVE_SESSION_EXISTS |
| V2-API-SES-004 | P0 | 비활성 세션 ping 차단 | 완료 세션 ping | SESSION_NOT_ACTIVE |
| V2-API-SES-005 | P1 | cancel 중복 차단 | 취소 후 재취소 | SESSION_NOT_ACTIVE |

### 2.7 Submit API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-SUB-001 | P0 | 비소유 세션 제출 | 다른 사용자 세션 ID | SESSION_NOT_FOUND |
| V2-API-SUB-002 | P0 | 취소 세션 제출 | CANCELED 세션 | SESSION_NOT_ACTIVE |
| V2-API-SUB-003 | P0 | 표지 URL 형식 오류 | 잘못된 URL | 검증 실패 |
| V2-API-SUB-004 | P0 | 감상평 500자 초과 | 긴 reviewText | 검증 실패 |
| V2-API-SUB-005 | P1 | AI verification upsert | 재제출 정책 허용 시 | 기존 검증 row 업데이트 |

### 2.8 Verify API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-VER-001 | P0 | 없는 세션 표지 검증 | 잘못된 sessionId | SESSION_NOT_FOUND |
| V2-API-VER-002 | P0 | 이미지 누락 | vision body 이미지 없음 | AI_VERIFICATION_FAILED |
| V2-API-VER-003 | P0 | 감상평 누락 | llm body review 없음 | AI_VERIFICATION_FAILED |
| V2-API-VER-004 | P0 | 결과 없음 조회 | 검증 전 result 요청 | AI_VERIFICATION_FAILED 404 |
| V2-API-VER-005 | P1 | fallback provider | GEMINI_API_KEY 없음 | fallback 결과 반환 |

### 2.9 Reward API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-REW-001 | P0 | AI 미제출 완료 차단 | aiVerification 없음 | VERIFICATION_FAILED, 보상 0 |
| V2-API-REW-002 | P0 | 위치 실패 완료 | isLocationValid=false | 보상 0 |
| V2-API-REW-003 | P0 | 최소 시간 실패 | 20분 미만 | 보상 0 |
| V2-API-REW-004 | P0 | 페이지 이상치 실패 | 과도한 페이지 | 보상 0 |
| V2-API-REW-005 | P1 | 랭킹 upsert | 성공 완료 | userRanking 생성 또는 갱신 |

### 2.10 Ranking API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-RANK-001 | P0 | 닉네임 없는 유저 제외 | nickname null 사용자 존재 | 개인 랭킹 제외 |
| V2-API-RANK-002 | P0 | 진영 없는 유저 제외 | factionId null 사용자 존재 | 개인 랭킹 제외 |
| V2-API-RANK-003 | P0 | 동일 EXP 정렬 | exp 동일 사용자 존재 | createdAt 오름차순 보조 정렬 |
| V2-API-RANK-004 | P1 | totalBooks distinct | 같은 책 여러 세션 | 책 수는 1권으로 계산 |
| V2-API-RANK-005 | P1 | 비활성 진영 제외 | isActive=false | 진영 랭킹 제외 |

### 2.11 External API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-EXT-001 | P0 | Google profile sub 누락 | sub 없는 profile | 로그인 실패 |
| V2-API-EXT-002 | P0 | Library Info ISBN 장애 | 외부 API 오류 | 에러 전파 또는 BOOK_NOT_FOUND |
| V2-API-EXT-003 | P1 | Kakao geocode 실패 | 좌표 변환 실패 | null 반환 및 sync skip |
| V2-API-EXT-004 | P1 | Kakao 검색 캐싱 | 주변 검색 성공 | library upsert 실행 |
| V2-API-EXT-005 | P1 | Gemini 장애 fallback | Gemini 오류 | deterministic fallback 처리 |

### 2.12 Security/Error API

| TC ID | 우선순위 | 테스트 항목 | 절차 | 기대결과 |
| --- | --- | --- | --- | --- |
| V2-API-SEC-001 | P0 | Bearer prefix 누락 | 토큰만 전달 | 401 |
| V2-API-SEC-002 | P0 | 변조 JWT | 서명 틀린 토큰 | 401 |
| V2-API-SEC-003 | P0 | 잘못된 role payload | role 누락 토큰 | 요청 차단 또는 최소 권한 처리 |
| V2-API-SEC-004 | P1 | ValidationPipe whitelist | 불필요 필드 포함 요청 | 필드 제거 또는 forbid 에러 |
| V2-API-SEC-005 | P1 | 내부 서버 오류 형식 | 예상 못한 오류 발생 | `INTERNAL_SERVER_ERROR` 형식 반환 |
