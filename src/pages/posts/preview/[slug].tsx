import { GetStaticProps } from "next"
import { Session } from "next-auth"
import { getSession, useSession } from "next-auth/client"
import { useRouter } from "next/router"
import Head from 'next/head'
import Link from "next/link"

import { RichText } from "prismic-dom"
import { useEffect } from "react"
import { getPrismicClient } from "../../../services/prismic"

import styles from '../post.module.scss'

interface PostPreviewProps {
    post: {
        slug: string,
        title: string,
        content: string,
        updatedAt: string
    }
}

interface SessionData extends Session {
    activeSubscription?: Object | null
}

export default function PostPreview({ post }: PostPreviewProps) {

    const [session] = useSession()
    const typedSession = session as SessionData
    const router = useRouter()

    useEffect(() => {
        if (typedSession?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>

                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>

                    <div
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            <a>
                                Subscribe now 🚀
                            </a>
                        </Link>
                    </div>

                </article>
            </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params

    const prismic = getPrismicClient()

    const response = await prismic.getByUID('publication', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 4)),
        updatedAt: new Date(response.last_publication_date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        },
        revalidate: 60 * 30 // 30 minutos //
    }
}