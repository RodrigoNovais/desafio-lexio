export const Status = {
    'arquivado':            'archived',
    'aguard. aprov.':       'signed',
    'aguard. assinatura':   'awaiting-approval',
    'assinado':             'awaiting-signature',
    'em revisão':           'under-review',
} as const;

type BadgeProps = { status: keyof typeof Status; }

import BadgeCSS from './Badge.module.css';

const Badge: React.FC<BadgeProps> = ({ status }) => {
    return (
        <div className={`${BadgeCSS['badge']} ${BadgeCSS[Status[status]]}`}>
            <span>·</span>
            <p>{status}</p>
        </div>
    );
};

export default Badge;
