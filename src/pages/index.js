import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const topics = [
  {
    title: '01. CDN 개념 및 심화',
    description: 'CDN의 정의, 동작 방식, 동적 API에서 CDN을 쓰는 이유를 정리합니다.',
    to: '/docs/cs/cdn/1-1-intro-and-flow',
  },
];

function TopicCard({title, description, to}) {
  return (
    <Link className={styles.topicCard} to={to}>
      <Heading as="h2">{title}</Heading>
      <p>{description}</p>
    </Link>
  );
}

export default function Home() {
  return (
    <Layout
      title="수목원"
      description="이수목의 공부 위키">
      <main>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>이수목의 작은 공부 정원</p>
                <Heading as="h1" className={styles.heroTitle}>
                  수목원
                </Heading>
                <p className={styles.heroLead}>
                  스스로 공부한 개념과 실습 기록을 한 장씩 심어두는 개인 위키입니다.
                  이해한 것들은 문서로, 직접 굴려본 것들은 가지처럼 남겨둡니다.
                </p>
                <div className={styles.actions}>
                  <Link className="button button--primary" to="/docs/intro">
                    둘러보기
                  </Link>
                  <Link className="button button--secondary" to="/docs/workflow">
                    운영 방식
                  </Link>
                </div>
              </div>
              <div className={styles.flowPanel} aria-label="Repository workflow">
                <div className={styles.panelHeader}>
                  <span className={styles.panelMark}>study garden</span>
                  <span className={styles.panelStem} />
                </div>
                <div className={styles.flowItem}>
                  <span className={styles.branch}>main</span>
                  <span>정리한 문서가 머무는 흙</span>
                </div>
                <div className={styles.flowLine} />
                <div className={styles.flowItem}>
                  <span className={styles.branch}>lab/*</span>
                  <span>실습과 예시를 키워보는 가지</span>
                </div>
                <div className={styles.flowLine} />
                <div className={clsx(styles.flowItem, styles.flowItemStrong)}>
                  <span className={styles.branch}>docs/</span>
                  <span>다시 읽을 수 있게 다듬은 기록</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.topicSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">최근 심은 문서</Heading>
              <p>새로 정리한 개념과 실습 기록을 여기서 빠르게 이어봅니다.</p>
            </div>
            <div className={styles.topicGrid}>
              {topics.map((topic) => (
                <TopicCard key={topic.title} {...topic} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
