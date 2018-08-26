import React from 'react';
import { Discord, Facebook, YouTube, Twitter } from './components/Svgs';

import styles from './styles.scss';

const Custom = () => {
   return (
      <span></span>
   )
}
// 
// const SocialLink = props => {
//    const style = { height: props.height, }
//    const color = props.color ? props.color : '#C4C3C7';
//    let SocialType;
//    if (props.social == 'discord') {SocialType = 'Discord'}
//    else if (props.social == 'facebook' || props.social == 'fb') {SocialType = 'Facebook'}
//    else if (props.social == 'youtube' || props.social == 'yt') {SocialType = 'YouTube'}
//    else if (props.social == 'twitter') {SocialType = 'Twitter'}
//    else if (!props.social || props.social == 'custom') {SocialType = 'Custom'};
//    let defaultHref;
//    if (props.social == 'facebook') {defaultHref = 'https://www.facebook.com/thelastflamestudios'}
//    else if (props.social == 'youtube') {defaultHref = 'https://www.youtube.com/channel/UCn-wVHF-lwf2qzYn-odbZKQ'}
//    else if (props.social == 'discord') {defaultHref = 'https://discord.gg/abaFqjS'}
//    else if (props.social == 'twitter') {defaultHref = 'https://twitter.com/thelastflame_'}
//    else {defaultHref = props.href};
//    const href = props.href || defaultHref;
//    return (
//       <a href={href} className={styles.socialLink}>{props.children}<SocialType /></a>
//    );
// }
// 
// export default SocialLink;

export const DiscordLink = props => {
   const href = props.href || 'https://discord.gg/abaFqjS';
   const target = props.target || '_blank';
   return (
       <a target={target} href={href} className={styles.socialLink}><Discord height={props.height} color={props.color} /></a>
   )
}
export const FacebookLink = props => {
   const href = props.href || 'https://www.facebook.com/thelastflamestudios';
   const target = props.target || '_blank';
   return (
       <a target={target} href={href} className={styles.socialLink}><Facebook height={props.height} color={props.color} /></a>
   )
}

export const YoutubeLink = props => {
   const href = props.href || 'https://www.youtube.com/channel/UCn-wVHF-lwf2qzYn-odbZKQ';
   const target = props.target || '_blank';
   return (
       <a target={target} href={href} className={styles.socialLink}><YouTube height={props.height} color={props.color} /></a>
   )
}

export const TwitterLink = props => {
   const href = props.href || 'https://twitter.com/thelastflame_';
   const target = props.target || '_blank';
   return (
       <a target={target} href={href} className={styles.socialLink}><Twitter height={props.height} color={props.color} /></a>
   )
}

export const CustomLink = props => {
   const href = props.href || '#';
   const target = props.target || '_blank';
   return (
       <a target={target} href={href} className={styles.socialLink}>{props.children}</a>
   )
}
