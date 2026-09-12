import React from 'react';

export const CodeWatermarkBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#08090A]">
      {/* Deep dark gradient mesh */}
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#00F0FF]/[0.03] blur-[150px]" />
      <div className="absolute top-[40%] right-[-15%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/[0.02] blur-[160px]" />
      <div className="absolute bottom-[-15%] left-[25%] w-[45vw] h-[45vw] rounded-full bg-[#00F0FF]/[0.02] blur-[150px]" />

      {/* Subtle geometric dot grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 240, 255, 0.6) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Large Background Typography */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 font-display text-[14vw] font-black tracking-tighter text-white/[0.015] whitespace-nowrap leading-none">
        &lt;SYSTEMS /&gt;
      </div>
      <div className="absolute top-[45%] right-[5%] font-display text-[12vw] font-black tracking-tighter text-cyan-400/[0.012] whitespace-nowrap leading-none">
        ARCHITECT
      </div>
      <div className="absolute top-[75%] left-[2%] font-display text-[13vw] font-black tracking-tighter text-white/[0.015] whitespace-nowrap leading-none">
        &lt;HAMZAH /&gt;
      </div>

      {/* Low-opacity Code Watermarks */}
      <div className="absolute top-28 left-8 font-mono text-xs md:text-sm text-cyan-300/[0.07] leading-relaxed hidden sm:block">
        <div>function allocateRingBuffer(size: usize): *mut u8 &#123;</div>
        <div className="pl-4">var ptr = unsafe &#123; VirtualAlloc(null, size, MEM_COMMIT, PAGE_READWRITE) &#125;;</div>
        <div className="pl-4">return if (ptr != 0) ptr else null;</div>
        <div>&#125;</div>
      </div>

      <div className="absolute top-[35%] left-12 font-mono text-xs text-teal-300/[0.06] leading-relaxed hidden lg:block">
        <div>// MFT Direct Index Cursor</div>
        <div>var recordHeader = ReadNtfsSector(diskHandle, 0x0004);</div>
        <div>if (recordHeader.magic == 0x454C4946) &#123;</div>
        <div className="pl-4">return parseAttributes(&amp;recordHeader);</div>
        <div>&#125;</div>
      </div>

      <div className="absolute top-[20%] right-10 font-mono text-xs md:text-sm text-cyan-300/[0.06] text-right leading-relaxed hidden md:block">
        <div>async function handlePeerTransaction(payload: EncryptedBlob) &#123;</div>
        <div className="pr-4">const verified = await Enclave.verifySignature(payload);</div>
        <div className="pr-4">var settlement = await Ledger.dispatchBatch([payload]);</div>
        <div>return settlement.txId;</div>
        <div>&#125;</div>
      </div>

      <div className="absolute top-[60%] right-8 font-mono text-xs text-sky-400/[0.05] leading-relaxed text-right hidden sm:block">
        <div>struct MemoryPartition &#123;</div>
        <div>&nbsp;&nbsp;var baseAddress: usize;</div>
        <div>&nbsp;&nbsp;var pageCount: u32;</div>
        <div>&nbsp;&nbsp;return this.baseAddress + (pageCount * 4096);</div>
        <div>&#125;</div>
      </div>

      <div className="absolute bottom-24 left-16 font-mono text-xs text-teal-300/[0.05] leading-relaxed hidden md:block">
        <div>function syncKernelCache(): Promise&lt;Status&gt; &#123;</div>
        <div>&nbsp;&nbsp;var flushed = syscall.FlushFileBuffers(hDevice);</div>
        <div>&nbsp;&nbsp;return flushed ? Status.OK : Status.IO_ERROR;</div>
        <div>&#125;</div>
      </div>

      <div className="absolute bottom-12 right-20 font-mono text-xs text-cyan-400/[0.06] leading-relaxed text-right hidden lg:block">
        <div>&lt;OmniEngine threadPool="num_cpus * 2" cache="direct-io" /&gt;</div>
        <div>&lt;QPayVault cipher="AES-256-GCM" state="immutable" /&gt;</div>
      </div>
    </div>
  );
};
