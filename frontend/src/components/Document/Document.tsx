import Avatar from '../Avatar';
import Badge, { Status } from '../Badge';

import DocumentCSS from './Document.module.css';

export type Agreement = {
    id: number,
    title: string,
    sub_title: string,
    status: keyof typeof Status,
    parties: string[],
    object: string
}

type DocumentProps = { document: Agreement }

const Document: React.FC<DocumentProps> = ({ document }) => {
    return (
        <div className={DocumentCSS['item']}>
            <div className={DocumentCSS['title']}>
                <p>{document.title}</p>
                <p>{document.sub_title}</p>
            </div>

            <div className={DocumentCSS['status']}>
                <Badge status={document.status} />
            </div>

            <div className={DocumentCSS['description']}>
                <p><span>Objeto: </span>{document.object}</p>
            </div>

            <div className={DocumentCSS['members']}>
                <p>Partes do contrato</p>
                <div className={DocumentCSS['avatars']}>
                    {document.parties.map(name => <Avatar key={name} name={name} />)}
                </div>
            </div>

            <div className={DocumentCSS['menu']}>
                <button>
                    <img src='/assets/images/icons/three-dots.svg' />
                </button>
            </div>
        </div>
    );
};

export default Document;
