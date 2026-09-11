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
import {
  getPlaylistLink,
  PlaylistLink,
} from '@app/web-player/playlists/playlist-link';
import {TRACK_MODEL} from '@app/web-player/tracks/track';
import {TrackImage} from '@app/web-player/tracks/track-image/track-image';
import {getTrackLink, TrackLink} from '@app/web-player/tracks/track-link';
import {UserImage} from '@app/web-player/users/user-image';
import {KineticGallerySection} from '@app/landing-page/kinetic-gallery-section';
import {
  getUserProfileLink,
  UserProfileLink,
} from '@app/web-player/users/user-profile-link';
import {Channel} from '@common/channels/channel';
import {LandingPage as CommonLandingPage} from '@common/ui/landing-page/landing-page';
import {LandingPageContext} from '@common/ui/landing-page/landing-page-context';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@shadcn/forms/input-group/input-group';
import {useSuspenseQuery} from '@tanstack/react-query';
import {message} from '@ui/i18n/message';
import {Trans} from '@ui/i18n/trans';
import {useTrans} from '@ui/i18n/use-trans';
import {USER_MODEL} from '@ui/types/user';
import clsx from 'clsx';
import {
  AudioLinesIcon,
  AudioWaveformIcon,
  BellIcon,
  ChartColumnBigIcon,
  CircleHelpIcon,
  CloudOffIcon,
  GlobeIcon,
  LightbulbIcon,
  ListMusicIcon,
  MessageCircleIcon,
  NewspaperIcon,
  Repeat2Icon,
  SearchIcon,
  TrendingUpIcon,
  UploadIcon,
  UserRoundIcon,
} from 'lucide-react';
import {
  cloneElement,
  ComponentType,
  CSSProperties,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {Link, useNavigate} from 'react-router';

const defaultIcons: Record<string, ReactElement> = {
  search: <SearchIcon />,
  highQuality: <AudioLinesIcon />,
  analytics: <ChartColumnBigIcon />,
  community: <GlobeIcon />,
  discover: <LightbulbIcon />,
  person: <UserRoundIcon />,
  help: <CircleHelpIcon />,
  support: <CircleHelpIcon />,
  publish: <UploadIcon />,
  insights: <TrendingUpIcon />,
  repeat: <Repeat2Icon />,
  repost: <Repeat2Icon />,
  feed: <NewspaperIcon />,
  playlist: <ListMusicIcon />,
  offline: <CloudOffIcon />,
  waves: <AudioWaveformIcon />,
  message: <MessageCircleIcon />,
  notifications: <BellIcon />,
};

const sectionRenderers: Record<
  string,
  ComponentType<{config: any; index: number}>
> = {
  channel: ChannelSection,
  'rolling-channel': RollingChannelSection,
  'kinetic-gallery': KineticGallerySection,
};

type HeroSearchBarProps = {
  background?: string;
};
function HeroSearchBar({background}: HeroSearchBarProps) {
  const navigate = useNavigate();
  const {trans} = useTrans();

  return (
    <form
      className="w-full"
      onSubmit={e => {
        e.preventDefault();
        navigate(`search/${(e.currentTarget[0] as HTMLInputElement).value}`);
      }}
    >
      <InputGroup className={clsx('h-12.5 rounded-full', background)}>
        <InputGroupAddon>
          <SearchIcon className="size-5" />
        </InputGroupAddon>
        <InputGroupInput
          bindToHookForm={false}
          placeholder={trans(message('Search for artists, albums, songs...'))}
        />
      </InputGroup>
    </form>
  );
}

export function Component() {
  const query = useSuspenseQuery(appQueries.landingPageData.get());
  return (
    <LandingPageContext.Provider
      value={{
        defaultIcons,
        sections: query.data.sections ?? [],
        sectionRenderers,
        heroSearchBarSlot: HeroSearchBar,
      }}
    >
      <CommonLandingPage />
    </LandingPageContext.Provider>
  );
}

type ChannelSectionProps = {
  config: {
    channelId?: number | string;
    badge?: string;
    title?: string;
    description?: string;
    speed?: number | string;
  };
};
function ChannelSection({config}: ChannelSectionProps) {
  const query = useSuspenseQuery(appQueries.landingPageData.get());
  const channel = query.data.channels?.find(
    c => c.id == config.channelId,
  ) as Channel<ChannelContentModel>;

  if (!channel) {
    return null;
  }

  return (
    <div className="@container mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <ChannelSectionHeader config={config} />
      <div className="relative mt-16 sm:mt-20 lg:mt-24">
        <div className="compact-scrollbar overflow-x-auto">
          <div className="grid min-w-266.5 grid-cols-5 grid-rows-2 gap-6">
            {channel.content?.data.map(item => (
              <GridItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div className="from-bg pointer-events-none absolute top-0 right-0 h-full w-17 bg-linear-to-l to-transparent xl:hidden" />
      </div>
    </div>
  );
}

function RollingChannelSection({config}: ChannelSectionProps) {
  const query = useSuspenseQuery(appQueries.landingPageData.get());
  const channel = query.data.channels?.find(
    c => c.id == config.channelId,
  ) as Channel<ChannelContentModel>;
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);

  useLayoutEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const updateWidth = () =>
      setGroupWidth(group.getBoundingClientRect().width);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(group);
    return () => observer.disconnect();
  }, [channel]);

  if (!channel) {
    return null;
  }

  const items = channel.content?.data ?? [];
  const parsedSpeed = Number(config.speed);
  const speed = Number.isFinite(parsedSpeed)
    ? Math.min(200, Math.max(10, parsedSpeed))
    : 35;
  const duration = groupWidth ? groupWidth / speed : 30;
  const animationStyle = {
    '--rolling-channel-duration': `${duration}s`,
  } as CSSProperties;

  return (
    <div className="@container py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ChannelSectionHeader config={config} />
      </div>
      {items.length ? (
        <div className="rolling-channel relative mt-16 overflow-hidden sm:mt-20 lg:mt-24">
          <div
            className="rolling-channel-track flex w-max"
            style={animationStyle}
          >
            <div ref={groupRef} className="flex shrink-0 gap-6 pr-6">
              {items.map(item => (
                <div key={item.id} className="w-42 shrink-0 sm:w-48 lg:w-52">
                  <GridItem item={item} />
                </div>
              ))}
            </div>
            <div className="flex shrink-0 gap-6 pr-6" aria-hidden="true" inert>
              {items.map(item => (
                <div key={item.id} className="w-42 shrink-0 sm:w-48 lg:w-52">
                  <GridItem item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="from-bg pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r to-transparent sm:w-20" />
          <div className="from-bg pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l to-transparent sm:w-20" />
        </div>
      ) : null}
    </div>
  );
}

function ChannelSectionHeader({config}: ChannelSectionProps) {
  return (
    <div className="mx-auto max-w-2xl lg:text-center">
      {config.badge ? (
        <p className="text-primary text-base/7 font-semibold">
          <Trans message={config.badge} />
        </p>
      ) : null}
      {config.title ? (
        <h2 className="text-foreground mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance">
          <Trans message={config.title} />
        </h2>
      ) : null}
      {config.description ? (
        <p className="text-muted-foreground mt-6 text-lg/8">
          <Trans message={config.description} />
        </p>
      ) : null}
    </div>
  );
}

function GridItem({item}: {item: ChannelContentModel}) {
  switch (item.model_type) {
    case ARTIST_MODEL:
      return (
        <GridItemLayout
          image={<SmallArtistImage artist={item} />}
          radius="rounded-full"
          title={<ArtistLink artist={item} />}
          link={getArtistLink(item)}
        />
      );
    case ALBUM_MODEL:
      return (
        <GridItemLayout
          image={<AlbumImage album={item} />}
          radius="rounded-card"
          title={<AlbumLink album={item} />}
          description={<ArtistLinks artists={item.artists} />}
          link={getAlbumLink(item)}
        />
      );
    case TRACK_MODEL:
      return (
        <GridItemLayout
          image={<TrackImage track={item} />}
          radius="rounded-card"
          title={<TrackLink track={item} />}
          description={<ArtistLinks artists={item.artists} />}
          link={getTrackLink(item)}
        />
      );
    case PLAYLIST_MODEL:
      const owner = item.editors[0];
      const playlistDescription = owner ? (
        <Trans
          message="By :name"
          values={{
            name: <UserProfileLink user={owner} />,
          }}
        />
      ) : null;
      return (
        <GridItemLayout
          image={<PlaylistImage playlist={item} />}
          radius="rounded-card"
          title={<PlaylistLink playlist={item} />}
          description={playlistDescription}
          link={getPlaylistLink(item)}
        />
      );
    case USER_MODEL:
      const userDescription = item.followers_count ? (
        <Trans
          message=":count followers"
          values={{count: item.followers_count}}
        />
      ) : null;
      return (
        <GridItemLayout
          image={<UserImage user={item} />}
          radius="rounded-card"
          title={<UserProfileLink user={item} />}
          description={userDescription}
          link={getUserProfileLink(item)}
        />
      );
    default:
      return null;
  }
}

type GridItemLayoutProps = {
  image: ReactElement<{size: string; className?: string}>;
  radius: string;
  title: ReactNode;
  description?: ReactNode;
  link: string;
};
function GridItemLayout({
  image,
  radius,
  title,
  description,
  link,
}: GridItemLayoutProps) {
  return (
    <div className="snap-start snap-normal">
      <div className="group relative isolate w-full">
        <Link className="block aspect-square w-full cursor-pointer" to={link}>
          {cloneElement(image, {
            size: 'w-full h-full',
            className: `${radius} shadow-md z-10`,
          })}
        </Link>
      </div>
      <div
        className={clsx(
          radius === 'rounded-full' && 'text-center',
          'mt-3 text-sm',
        )}
      >
        <div className="line-clamp-2 text-ellipsis">{title}</div>
        <div className="text-muted-foreground mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </div>
      </div>
    </div>
  );
}
