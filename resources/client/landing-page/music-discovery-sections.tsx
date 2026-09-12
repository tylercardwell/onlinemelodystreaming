import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {LandingPageButtonConfig, LandingPageImageConfig} from '@common/ui/landing-page/landing-page-config';
import {Buttons} from '@common/ui/landing-page/hero/shared';
import {ArrowRightIcon, SearchIcon} from 'lucide-react';
import {useSuspenseQuery} from '@tanstack/react-query';
import {Trans} from '@ui/i18n/trans';
import {USER_MODEL} from '@ui/types/user';
import clsx from 'clsx';
import {cloneElement, FormEvent, ReactElement, ReactNode, useState} from 'react';
import {Link, useNavigate} from 'react-router';

const optionOneAssets = {
  hero: new URL('../../images/landing-option-one/hero-collage.png', import.meta.url).href,
  editorial: new URL('../../images/landing-option-one/editorial.png', import.meta.url).href,
  cta: new URL('../../images/landing-option-one/cta-reference.png', import.meta.url).href,
  trend: Array.from({length: 7}, (_, index) => new URL(`../../images/landing-option-one/trend-${index + 1}.png`, import.meta.url).href),
  fresh: Array.from({length: 12}, (_, index) => new URL(`../../images/landing-option-one/fresh-${index + 1}.png`, import.meta.url).href),
  benefits: Array.from({length: 3}, (_, index) => new URL(`../../images/landing-option-one/benefit-${index + 1}.png`, import.meta.url).href),
};
const optionOneTrend = [['The Way Things Change', 'Lena Park'], ['Neon Heaven', 'Juno Vale'], ['Drive Slow', 'Marco Ellis'], ['Still Here', 'The Hollow Days'], ['Better Than This', 'Kai Rivers'], ['Tides', 'Solar State'], ['Lost in the Moment', 'Amara']];
const optionOneFresh = [['Higher Somewhere', 'Elise Monroe'], ['City Poems', 'Night Numbers'], ['A Brighter Tomorrow', 'Valen'], ['Motion', 'CRWN'], ['Coastline', 'The Drift'], ['Same Skies', 'Indigo Lane'], ['Golden Hour', 'Rae & The Sun'], ['Parallel', 'Echo Fields'], ['All We Have', 'The Weekend Club'], ['Midnight Cities', 'Kairo'], ['Further Than Yesterday', 'Nova Falls'], ['People in Motion', 'The Assembly']];

type Cover = {src: string; alt?: string};

export type DiscoveryHeroConfig = {
  name: 'discovery-hero';
  eyebrow?: string;
  title?: string;
  description?: string;
  covers?: Cover[];
  buttons?: LandingPageButtonConfig[];
  referenceAssets?: boolean;
};

export function DiscoveryHeroSection({config}: {config: DiscoveryHeroConfig}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = query.trim();
    if (term) navigate(`/search/${encodeURIComponent(term)}`);
  };
  const covers = config.covers ?? [];
  return <section className="relative isolate overflow-hidden bg-[#080a09] text-white"><Navbar.Root className="relative z-30 mx-auto max-w-[1536px] border-b border-white/10 bg-[#080a09] text-white dark:bg-[#080a09]"><Navbar.Logo color="light" url="/" /><nav className="ml-10 hidden items-center gap-7 text-xs font-bold tracking-[0.12em] text-white/55 uppercase md:flex"><Link to="/" className="text-white transition hover:text-[#1ed760]">Home</Link><Link to="/discover" className="transition hover:text-[#1ed760]">Discover</Link><Link to="/search" className="transition hover:text-[#1ed760]">Browse</Link></nav><Navbar.Content className="ml-auto"><Navbar.AuthContent /></Navbar.Content></Navbar.Root><div className="pointer-events-none absolute top-[-24rem] left-[48%] -z-10 size-[58rem] rounded-full bg-[#1ed760]/12 blur-[150px]" /><div className="mx-auto grid max-w-[1536px] items-center gap-7 px-6 pt-10 pb-10 sm:px-10 sm:pt-12 sm:pb-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-10 lg:px-16 lg:pt-14 lg:pb-14"><div className="relative z-10 max-w-2xl"><p className="text-xs font-bold tracking-[0.24em] text-[#1ed760] uppercase">{config.eyebrow}</p><h1 className="mt-5 text-5xl font-black tracking-[-0.07em] text-balance sm:text-7xl lg:text-[5.8rem] lg:leading-[.91]">{config.title}</h1><p className="mt-5 max-w-xl text-lg leading-7 text-white/65 sm:text-xl">{config.description}</p><form onSubmit={submitSearch} className="mt-7 max-w-xl"><label className="sr-only" htmlFor="discovery-search">Search music</label><div className="flex h-13 items-center rounded-full border border-white/15 bg-white/8 px-5 transition focus-within:border-[#1ed760] focus-within:bg-white/12"><SearchIcon className="size-5 shrink-0 text-white/55" /><input id="discovery-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search artists, albums, songs..." className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/42" /><button type="submit" className="text-xs font-bold tracking-[0.12em] text-[#1ed760] uppercase transition hover:text-white">Search</button></div></form><Buttons buttons={config.buttons ?? []} className="mt-8 flex flex-wrap gap-3" /><div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-xs font-bold tracking-[0.13em] text-white/45 uppercase"><span>New releases</span><span>Indie</span><span>Electronic</span><span>Hip hop</span><span>More</span></div></div>{config.referenceAssets ? <img src={optionOneAssets.hero} alt="Featured music" className="mx-auto w-full max-w-2xl object-contain" /> : <CoverField covers={covers} />}</div></section>;
}

function CoverField({covers}: {covers: Cover[]}) {
  const placements = ['top-[2%] left-[7%] w-[33%] rotate-[-13deg]', 'top-[8%] left-[38%] z-10 w-[40%] rotate-[8deg]', 'top-[36%] left-[16%] z-20 w-[43%] rotate-[5deg]', 'right-[5%] bottom-[8%] w-[35%] rotate-[13deg]', 'bottom-[1%] left-[2%] w-[28%] rotate-[-11deg]', 'top-[53%] right-[29%] z-10 w-[22%] rotate-[-8deg]'];
  return <div className="relative mx-auto h-[22rem] w-full max-w-2xl sm:h-[25rem] lg:h-[29rem]" aria-label="Featured music">{covers.slice(0, 6).map((cover, index) => <div key={cover.src} className={`absolute overflow-hidden rounded-xl shadow-2xl shadow-black/70 ${placements[index]}`}><img src={cover.src} alt={cover.alt ?? ''} className="aspect-square w-full object-cover" /></div>)}</div>;
}

export type EditorialDiscoveryConfig = {name: 'editorial-discovery'; eyebrow?: string; title?: string; description?: string; image?: LandingPageImageConfig; buttons?: LandingPageButtonConfig[]; referenceAssets?: boolean};
export function EditorialDiscoverySection({config}: {config: EditorialDiscoveryConfig}) {
  return <section className="bg-[#080a09] px-6 py-10 text-white sm:px-10 lg:px-16 lg:py-12"><div className="relative mx-auto max-w-[1536px] overflow-hidden bg-[#121614]"><img src={config.referenceAssets ? optionOneAssets.editorial : config.image?.src} alt="" className="absolute inset-0 size-full object-cover opacity-65" /><div className="absolute inset-0 bg-linear-to-r from-[#121614] via-[#121614]/92 to-transparent" /><div className="relative max-w-2xl px-7 py-14 sm:px-12 sm:py-18"><p className="text-xs font-bold tracking-[0.2em] text-[#1ed760] uppercase">{config.eyebrow}</p><h2 className="mt-4 text-4xl font-black tracking-[-0.065em] text-balance sm:text-6xl">{config.title}</h2><p className="mt-5 max-w-lg text-lg leading-7 text-white/68">{config.description}</p><Buttons buttons={config.buttons ?? []} className="mt-8 flex flex-wrap gap-3" /></div></div></section>;
}

export type DiscoveryBenefitsConfig = {name: 'discovery-benefits'; eyebrow?: string; title?: string; description?: string; benefits?: Array<{title: string; description: string; image?: LandingPageImageConfig}>; referenceAssets?: boolean};
export function DiscoveryBenefitsSection({config}: {config: DiscoveryBenefitsConfig}) {
  return <section className="bg-[#080a09] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16"><div className="mx-auto max-w-[1536px]"><p className="text-xs font-bold tracking-[0.2em] text-[#1ed760] uppercase">{config.eyebrow}</p><h2 className="mt-3 text-4xl font-black tracking-[-0.06em] sm:text-5xl">{config.title}</h2><p className="mt-3 max-w-xl text-white/60">{config.description}</p><div className="mt-8 grid gap-4 md:grid-cols-3">{config.benefits?.map((item, index) => <article key={item.title} className="relative min-h-72 overflow-hidden rounded-lg border border-white/10 bg-[#121614] p-5"><img src={config.referenceAssets ? optionOneAssets.benefits[index] : item.image?.src} alt="" className="absolute inset-0 size-full object-cover opacity-55" /><div className="absolute inset-0 bg-linear-to-t from-[#121614] via-[#121614]/45 to-transparent" /><div className="relative flex h-full flex-col justify-end"><h3 className="text-xl font-black tracking-[-0.05em]">{item.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/70">{item.description}</p></div></article>)}</div></div></section>;
}

export type CatalogCtaConfig = {name: 'catalog-cta'; eyebrow?: string; title?: string; description?: string; image?: LandingPageImageConfig; buttons?: LandingPageButtonConfig[]; referenceAssets?: boolean};
export function CatalogCtaSection({config}: {config: CatalogCtaConfig}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitSearch = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const term = query.trim(); if (term) navigate(`/search/${encodeURIComponent(term)}`); };
  if (config.referenceAssets) {
    return <section className="bg-[#080a09] px-2 py-10 text-white sm:px-6 lg:px-8"><div className="relative mx-auto max-w-[1536px]"><img src={optionOneAssets.cta} alt="Explore more: Your next favorite song is out there." className="w-full rounded-xl border border-white/10" /><form onSubmit={submitSearch} className="absolute top-[33%] left-[61%] h-[29%] w-[35%] opacity-0"><label className="sr-only" htmlFor="catalog-search">Search the catalog</label><input id="catalog-search" value={query} onChange={event => setQuery(event.target.value)} className="size-full" placeholder="Search artists, albums, songs..." /><button type="submit" className="sr-only">Search</button></form></div></section>;
  }
  return <section className="bg-[#080a09] px-6 py-12 text-white sm:px-10 lg:px-16 lg:py-16"><div className="relative mx-auto max-w-[1536px] overflow-hidden rounded-xl border border-white/10 bg-[#121614] px-7 py-12 sm:px-12 sm:py-14"><img src={config.referenceAssets ? optionOneAssets.cta : config.image?.src} alt="" className="absolute inset-0 size-full object-cover opacity-45" /><div className="absolute inset-0 bg-[#07140d]/55" /><div className="relative grid items-end gap-9 lg:grid-cols-[.9fr_1.1fr]"><div><p className="text-xs font-bold tracking-[0.2em] text-[#1ed760] uppercase">{config.eyebrow}</p><h2 className="mt-3 max-w-xl text-4xl font-black tracking-[-0.065em] text-balance sm:text-5xl">{config.title}</h2><p className="mt-4 max-w-lg text-base leading-7 text-white/72">{config.description}</p></div><form onSubmit={submitSearch} className="w-full"><label className="sr-only" htmlFor="catalog-search">Search the catalog</label><div className="flex h-13 items-center rounded-full border border-white/50 bg-white/14 px-5 backdrop-blur"><SearchIcon className="size-5 shrink-0 text-white/65" /><input id="catalog-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search artists, albums, songs..." className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/55" /><button type="submit" className="text-xs font-bold tracking-[0.12em] text-[#1ed760] uppercase">Search</button></div></form></div></div></section>;
}

type CatalogConfig = {name: 'catalog-rail' | 'catalog-grid'; badge?: string; title?: string; description?: string; channelId?: number | string; referenceAssets?: boolean};
export function CatalogRailSection({config}: {config: CatalogConfig}) {
  const items = useCatalogItems(config.channelId);
  return <section className="bg-[#080a09] px-6 py-10 text-white sm:px-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-[1536px]"><SectionIntro config={config} align="between" /><div className="mt-7 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4 md:grid-cols-7 lg:gap-x-5">{config.referenceAssets ? optionOneTrend.map((item, index) => <ReferenceItem key={item[0]} image={optionOneAssets.trend[index]!} title={item[0]} description={item[1]} />) : items.slice(0, 7).map(item => <CatalogItem key={item.id} item={item} />)}</div></div></section>;
}
export function CatalogGridSection({config}: {config: CatalogConfig}) {
  const items = useCatalogItems(config.channelId);
  return <section className="bg-[#080a09] px-6 py-10 text-white sm:px-10 lg:px-16 lg:py-12"><div className="mx-auto max-w-[1536px]"><SectionIntro config={config} align="between" /><div className="mt-8 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 sm:gap-x-4 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-8">{config.referenceAssets ? optionOneFresh.map((item, index) => <ReferenceItem key={item[0]} image={optionOneAssets.fresh[index]!} title={item[0]} description={item[1]} />) : items.slice(0, 12).map(item => <CatalogItem key={item.id} item={item} />)}</div></div></section>;
}
function ReferenceItem({image, title, description}: {image: string; title: string; description: string}) { return <Link to="/discover" className="group min-w-0"><img src={image} alt="" className="aspect-square w-full object-cover" /><p className="mt-2 truncate text-xs font-bold group-hover:text-[#1ed760]">{title}</p><p className="mt-1 truncate text-[10px] text-white/55">{description}</p></Link>; }
function useCatalogItems(channelId?: number | string) {
  const query = useSuspenseQuery(appQueries.landingPageData.get());
  const channel = query.data.channels?.find(item => item.id == channelId) as Channel<ChannelContentModel> | undefined;
  return channel?.content?.data ?? [];
}
function SectionIntro({config, align}: {config: CatalogConfig; align: 'between'}) {
  return <div className="flex items-end justify-between gap-6"><div>{config.badge ? <p className="text-xs font-bold tracking-[0.2em] text-[#1ed760] uppercase">{config.badge}</p> : null}<h2 className="mt-2 text-4xl font-black tracking-[-0.06em] sm:text-5xl">{config.title}</h2>{config.description ? <p className="mt-3 text-white/60">{config.description}</p> : null}</div><Link to="/discover" className="hidden items-center gap-2 text-xs font-bold tracking-[0.14em] text-white/65 uppercase transition hover:text-[#1ed760] sm:inline-flex">See all <ArrowRightIcon className="size-4" /></Link></div>;
}
function CatalogItem({item}: {item: ChannelContentModel}) {
  switch (item.model_type) {
    case ARTIST_MODEL: return <CatalogItemLayout image={<SmallArtistImage artist={item} />} radius="rounded-full" title={<ArtistLink artist={item} />} link={getArtistLink(item)} />;
    case ALBUM_MODEL: return <CatalogItemLayout image={<AlbumImage album={item} />} radius="rounded-xl" title={<AlbumLink album={item} />} description={<ArtistLinks artists={item.artists} />} link={getAlbumLink(item)} />;
    case TRACK_MODEL: return <CatalogItemLayout image={<TrackImage track={item} />} radius="rounded-xl" title={<TrackLink track={item} />} description={<ArtistLinks artists={item.artists} />} link={getTrackLink(item)} />;
    case PLAYLIST_MODEL: { const owner = item.editors[0]; return <CatalogItemLayout image={<PlaylistImage playlist={item} />} radius="rounded-xl" title={<PlaylistLink playlist={item} />} description={owner ? <Trans message="By :name" values={{name: <UserProfileLink user={owner} />}} /> : null} link={getPlaylistLink(item)} />; }
    case USER_MODEL: return <CatalogItemLayout image={<UserImage user={item} />} radius="rounded-xl" title={<UserProfileLink user={item} />} description={item.followers_count ? <Trans message=":count followers" values={{count: item.followers_count}} /> : null} link={getUserProfileLink(item)} />;
    default: return null;
  }
}
function CatalogItemLayout({image, radius, title, description, link}: {image: ReactElement<{size: string; className?: string}>; radius: string; title: ReactNode; description?: ReactNode; link: string}) {
  return <div className="group min-w-0"><Link className="block aspect-square overflow-hidden bg-[#191b1a]" to={link}>{cloneElement(image, {size: 'size-full', className: `${radius} size-full object-cover transition duration-500 group-hover:scale-105`})}</Link><div className={clsx(radius === 'rounded-full' && 'text-center', 'mt-3')}><div className="line-clamp-1 text-sm font-bold group-hover:text-[#1ed760]">{title}</div><div className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap text-xs text-white/55">{description}</div></div></div>;
}
import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {appQueries} from '@app/app-queries';
import {ALBUM_MODEL} from '@app/web-player/albums/album';
import {AlbumImage} from '@app/web-player/albums/album-image/album-image';
import {AlbumLink, getAlbumLink} from '@app/web-player/albums/album-link';
import {ARTIST_MODEL} from '@app/web-player/artists/artist';
import {SmallArtistImage} from '@app/web-player/artists/artist-image/small-artist-image';
import {ArtistLink, getArtistLink} from '@app/web-player/artists/artist-link';
import {ArtistLinks} from '@app/web-player/artists/artist-links';
import {PLAYLIST_MODEL} from '@app/web-player/playlists/playlist';
import {PlaylistImage} from '@app/web-player/playlists/playlist-image';
import {getPlaylistLink, PlaylistLink} from '@app/web-player/playlists/playlist-link';
import {TRACK_MODEL} from '@app/web-player/tracks/track';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {getTrackLink, TrackLink} from '@app/web-player/tracks/track-link';
import {UserImage} from '@app/web-player/users/user-image';
import {getUserProfileLink, UserProfileLink} from '@app/web-player/users/user-profile-link';
import {Channel} from '@common/channels/channel';
