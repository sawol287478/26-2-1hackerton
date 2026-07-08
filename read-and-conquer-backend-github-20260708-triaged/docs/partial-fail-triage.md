# PARTIAL / FAIL 정리

기준: 첨부 테스트케이스에서 `PASS`, `N/T`를 제외하고 `PARTIAL`, `FAIL`만 재분류했다.

## 수정 완료

| 영역 | 기존 판정 | 처리 |
| --- | --- | --- |
| AUTH-001~003 | PARTIAL | 로그인 응답에 `onboardingCompleted` 추가 |
| AUTH-005~007 | FAIL | `/api/auth/refresh`, `/api/auth/logout` 추가 |
| ONB-001 | PARTIAL | `/api/users/me` 응답에 userId, email, name, faction object, ranking, onboardingCompleted 추가 |
| ONB-002~003 | FAIL | `/api/users/check-nickname` 추가 |
| ONB-005 | PARTIAL | 닉네임 최대 길이를 12자로 조정 |
| ONB-007 | FAIL | 닉네임 trim 처리 추가 |
| ONB-008~010 | PARTIAL | 프로필 등록 시 `onboardingCompleted=true` 저장 |
| FAC-001 | PARTIAL | 진영 목록에 `memberCount` 추가 |
| LIB-004 | FAIL | 주변 도서관 응답의 `occupiedFaction.color` 추가 |
| LIB-006~007 | PARTIAL | 도서관 상세 응답을 현재 점령 진영 객체와 영향력 점수 내림차순 기준으로 정리 |
| BOOK-004 | FAIL | ISBN 10/13자리 형식 검증 추가 |
| SES-001 | PARTIAL | 세션 시작 응답에 `status=IN_PROGRESS` 포함 |
| SES-003 | FAIL | `accuracyMeters` 검증 및 `GPS_ACCURACY_TOO_LOW` 에러 추가 |
| SES-005~006 | PARTIAL/FAIL | 위치 이탈 시 `OUT_OF_RANGE` 로그와 `isLocationValid=false` 저장, 최종 완료 실패로 연결 |
| SES-009 | FAIL | `/api/sessions/{sessionId}/cancel` 추가 |
| SUB-001~009 | FAIL | `/api/sessions/{sessionId}/submit` 추가, 필수값/페이지/최소 20분/읽은 페이지 수 검증 추가 |
| VER-005~009 | PARTIAL/FAIL | 완료 처리에서 최소 시간, 페이지 이상치, 위치 유효성, AI 결과를 모두 검증 |
| VER-010~011 | FAIL/PARTIAL | `/api/verify/{sessionId}` 추가 |
| REW-003~007 | PARTIAL/FAIL | `influence_logs`, 최고 영향력 점령, 동점 시 기존 점령 유지 규칙 반영 |
| REW-008 | PASS 유지 | 이미 완료/실패/취소된 세션 재완료 시 `SESSION_NOT_ACTIVE`로 차단 |
| MY-001~006 | FAIL | `/api/users/me/books`, `/api/users/me/sessions`, `/api/users/me/libraries` 추가 |
| RANK-004~005 | FAIL | 진영 랭킹을 점령 도서관 수 우선, 총 영향력 2차 기준으로 정렬 |
| E2E-001~007 | FAIL/PARTIAL | submit, verify result, mypage, influence-based occupation 흐름을 연결 가능하게 보강 |
| SEC-005 | PASS 강화 | 완료 중복 호출 시 보상 중복 지급 방지 명시 |

## 수정 필요하지만 MVP 보류

| 항목 | 이유 |
| --- | --- |
| AUTH-007 Refresh Token 서버 저장/블랙리스트 | 현재 JWT stateless 방식이라 로그아웃은 클라이언트 토큰 폐기 응답만 제공한다. 운영 단계에서는 Redis blacklist 또는 refresh token 테이블이 필요하다. |
| SES-006 15분 이탈 누적 자동 취소 | 현재는 이탈 즉시 최종 인증 실패로 연결한다. 15분 누적 판정은 백그라운드 잡 또는 위치 로그 집계 정책이 확정되면 추가한다. |
| SES-008 `READY_TO_VERIFY` 자동 전환 | 별도 세션 상태 조회/스케줄러가 필요하다. 현재는 submit 시점에 20분 조건을 검증한다. |
| VER-012 AI 장시간 처리 대기 상태 | MVP는 동기 검증 + fallback이다. 큐 기반 비동기 검증은 운영 확장 항목이다. |
| EXT-008 외부 API timeout/retry 표준화 | 개별 클라이언트에서 기본 장애 전파는 가능하나, 공통 timeout/retry 정책은 추후 axios/http client 레이어로 묶는 것이 좋다. |
| NFR 성능 기준 | 목표 TPS/응답시간/데이터 규모가 정해져야 측정 가능하다. |

## 불필요 또는 기준 변경

| 항목 | 판단 |
| --- | --- |
| EXT-006~007 OpenAI Responses API 필수 | 현재 프로젝트 환경변수와 기존 구현은 `GEMINI_API_KEY` 기반이다. MVP 기준에서는 Gemini 검증을 공식 AI 제공자로 유지한다. OpenAI 전환은 별도 요구가 있을 때만 진행한다. |
| 기존 HP 기반 점령 테스트 | 최신 ERD는 `library_influences`와 `current_occupied_faction_id` 기반이다. HP 방식 테스트는 제거하고 영향력 최고점 기준 테스트로 대체한다. |
| 실패 응답 wrapper 유지 | 테스트 기준의 `{ code, message }`에 맞춰 실패 응답은 top-level `code`, `message`로 정리했다. 성공 응답 wrapper는 기존 호환 API 일부에만 남아 있다. |

## 자동 테스트 상태

현재 로컬 Jest 기준:

```text
npm run build
npm test -- --runInBand
```

두 명령 모두 통과해야 GitHub 업로드 가능 상태로 본다.
