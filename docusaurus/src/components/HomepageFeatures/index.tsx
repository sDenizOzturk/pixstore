import type { ReactNode } from 'react'
import clsx from 'clsx'
import Heading from '@theme/Heading'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Automatic Caching & Fast Access',
    Svg: require('@site/static/img/automatic-caching.svg').default,
    description: (
      <>
        Images are cached automatically on both browser (IndexedDB) and backend
        (SQLite), enabling lightning-fast access and reducing network usage.
      </>
    ),
  },
  {
    title: 'Secure & Encrypted Storage',
    Svg: require('@site/static/img/secure-encrypte-storage.svg').default,
    description: (
      <>
        All images are encrypted end-to-end using AES-GCM. Each image is
        protected with a unique key, stored only on the backend.
      </>
    ),
  },
  {
    title: 'Universal & Extensible API',
    Svg: require('@site/static/img/universal-extensible-api.svg').default,
    description: (
      <>
        The same simple API works in both Node.js and the browser. Easily extend
        with custom endpoints and integrate with your own systems.
      </>
    ),
  },
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
