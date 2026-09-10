import {ChannelContentModel} from '@app/admin/channels/channel-content-config';
import {ChannelContent} from '@app/web-player/channels/channel-content';
import {PlayerPageHeaderGradient} from '@app/web-player/layout/player-page-header-gradient';
import {PlayerPageSuspense} from '@app/web-player/layout/player-page-suspsense';
import {AdHost} from '@common/admin/ads/ad-host';
import {Channel} from '@common/channels/channel';
import {useChannel} from '@common/channels/requests/use-channel';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {NotFoundPage} from '@common/ui/not-found-page/not-found-page';
import {useMemo} from 'react';

type Props = {
  slugOrId?: string | number;
};
export function Component({slugOrId}: Props) {
  return (
    <PlayerPageSuspense>
      <ChannelPage slugOrId={slugOrId} />
    </PlayerPageSuspense>
  );
}

function ChannelPage({slugOrId}: Props) {
  const query = useChannel(slugOrId, 'channelPage');
  const channel = query.data?.channel as Channel<ChannelContentModel> | undefined;

  // Settings can retain an ID for a channel that was removed during a
  // database reset. Render a normal not-found page instead of crashing while
  // attempting to access its content.
  if (!channel) {
    return <NotFoundPage />;
  }

  const randomImage = useMemo(() => {
    return getRandomImage(channel);
  }, [channel]);

  return (
    <>
      <PageMetaTags query={query} />
      {randomImage ? (
        <PlayerPageHeaderGradient image={randomImage} height="h-[20vh]" />
      ) : null}
      <div className="relative pb-6">
        <AdHost slot="general_top" className="mb-8.5" />
        <ChannelContent
          channel={channel}
          // set key to force re-render when channel changes
          key={channel.id}
        />
        <AdHost slot="general_bottom" className="mt-8.5" />
      </div>
    </>
  );
}

function getRandomImage(
  channel: Channel<ChannelContentModel>,
): string | undefined {
  const content = channel.content?.data ?? [];
  for (const item of content) {
    if (item.model_type === 'channel') {
      return getRandomImage(item as Channel<ChannelContentModel>);
    }
    if (item.model_type === 'artist' && item.image_small) {
      return item.image_small;
    }
    if (item.model_type === 'album' && item.image) {
      return item.image;
    }
    if (item.model_type === 'track' && item.image) {
      if (item.image) {
        return item.image;
      } else if (item.album?.image) {
        return item.album.image;
      }
    }
    if (item.model_type === 'genre' && item.image) {
      return item.image;
    }
    if (item.model_type === 'playlist' && item.image) {
      return item.image;
    }
    if (item.model_type === 'user' && item.image) {
      return item.image;
    }
  }
}
